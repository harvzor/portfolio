Thread safety sounds complicated, but with a couple of examples, a simple understanding of how threads work can be made.

This became an area of interest to me recently when some strange behaviour occured in a program that I had helped write. The program was originally written as a simple static class, but as time went on, more and more features were added, until the class was a monstrosity. We've all been there...

Eventually thread safety became a problem with the program because a second process (or thread) of the static method was called while the first method was still running.

Here is a simplified example of the buggy program:

```
namespace StaticTest
{
    public class Program
    {
        static void Main(string[] args)
        {
            while (true)
            {
                // Run the method asynchronously.
                new Task(Worker.Work).Start();

                Thread.Sleep(5000);

                new Task(Worker.Work).Start();

                Console.ReadLine();
            }
        }
    }

    /// <summary>
    /// A class that will do "work".
    /// </summary>
    public static class Worker
    {
        /// <summary>
        /// A simple logging variable which has text appended to it.
        /// </summary>
        public static string Log;

        /// <summary>
        /// An indicator that stops the process from being ran twice.
        /// </summary>
        public static bool InProgress;

        /// <summary>
        /// A fake method that will work for 10 seconds before logging.
        /// </summary>
        public static void Work()
        {
            Log = "";

            var startTime = DateTime.Now;

            Log += "Started at: " + startTime.ToString() + Environment.NewLine;

            if (InProgress)
            {
                Log += "Process already started before. Exiting out." + Environment.NewLine;

                return;
            }

            InProgress = true;

            Log += "Doing work for 10 seconds..." + Environment.NewLine;

            Thread.Sleep(10000);

            Log += "Finished work." + Environment.NewLine;

            Log += "Ended at: " + DateTime.Now.ToString() + Environment.NewLine;

            Console.Write(Log);

            InProgress = false;
        }
    }
}
```

This program had a little bit of consideration put into it to ensure some simple safety:

- the log was set to an empty string when the `Work()` method was called
- an `InProgress` boolean is set to true to ensure that the work can't be done twice at the same time

I expected the following to be logged to the terminal:

```
Started at: 26/10/2016 20:11:27
Finished work.
Ended at: 26/10/2016 20:11:27
```

But instead, this was logged:

```
Started at: 26/10/2016 20:11:27
Process already started before. Exiting out.
Finished work.
Ended at: 26/10/2016 20:11:32
```

This can be a little bit confusing, but as it turns out, the static properties on a static class are not thread safe. What this means is that the property is shared between threads.

Here's a step by step on what happened:

- Main started running
- the Work method was ran (on a new thread, which we will call "Work (1)")
- Main then paused on Thread.Sleep(5000)
- Work (1) continued and set the Log string to empty. It then added "Started at: 26/10/2016 20:11:27"
- Process.InProgress was currently set to false, so Work skipped the if block
- Process.InPogress was set to true
- "Doing work for 10 seconds..." is added to the log
- Work (1) then waited at Thread.Sleep(10000)
- Main finished waiting and started a new thread for the next Work (2) method
- Work (2) sets the Log string to empty. It then added "Started at: 26/10/2016 20:11:32"
- Work (2) saw that the InProgress boolean was set to true, and added "Process already started before. Exiting out." to the Log
- Work (1) finished waiting added "Finished work." and "Ended at: 26/10/2016 20:11:32" to the Log
- Work (1) writes the Log to the console

This program can be fixed by either making the Worker class non-static (along with the properties and methods inside of it), or by making the Log thread static. This can be done with a simple attribute:

```
[ThreadStatic]
public static string Log;
```

## The moral of the story

Generally in a majority of my classes I won't use static classes. Although static classes are quicker to instantiate (in terms of processing time and developer writing time), they're not exactly perfect for all situations.

The only time I would consider using a static class is if I want to implement a helper method - such as changing a DateTime into a specific format. These kinds of methods can be useful, but can be slightly annoying to call if a class has to be instantiated.
