As you may know, Umbraco has a built-in way of handling task scheduling. Shove the following code in a YourUmbracoSite.Web/config/umbracoSettings.config file and you're away:

```
<scheduledTasks>
    <!-- add tasks that should be called with an interval (seconds) -->
    <task log="true" alias="My Scheduled Task" interval="3600" url="https://website.com/umbraco/api/tasks/method" />
</scheduledTasks>
```

You can read more about using this <a href="https://our.umbraco.org/Documentation/Reference/Config/umbracoSettings/#scheduledtasks" target="_blank">here</a>.

This works by visiting the given URL at a set interval (in seconds). But this method has a lot of drawbacks:

- you can't set a specific time for a task to occur (such as once per day)
- the only way to check to see if a task triggered or completed is to look in the Umbraco log which isn't transparent for non-developers
- it's possible that two instances of the same task could run simultaneously as this method doesn't check for an existing running task
- the task can be interrupted by a server or website restart and there's no built in error handling
- tasks have to be publicly accessible by a URL and the built in Umbraco authorisation <!--(for Umbraco users or members)--> doesn't work

<!-- Removed as it's not important?
Considering these shortcomings, it's amazing I have worked on some sites which feature ScheduledTasks as a crucial part of the site architecture. Tasks which I have seen include ones which:

- trigger CSV imports to update site content
- ensure that repeat payments or orders occur
- fire off emails when an internally tested error occurs
-->

It's about time we did away with this and used something more professional!

## Okay! What's the solution?

There's a few ways to schedule tasks in .NET. Here are some options:

- <a href="#quartz">Quartz</a>
- <a href="#hangfire">Hangfire</a>
- <a href="#windows-task-scheduler">Windows Task Scheduler</a>

### Quartz

<a href="https://www.quartz-scheduler.net/" target="_blank">Quartz</a> is an open source .NET scheduler and is a port of a popular Java job scheduler.

I have used Quartz on an internal project and my experience was good. You can either schedule tasks using the built in LINQ methods, or if you understand <a href="http://www.adminschoice.com/crontab-quick-reference" target="_blank">crontabs</a> then you can build complex schedules with one line strings.

Tasks can either be stored in memory or you can configure Quartz to save tasks to a database. The former option is simpler to setup, but would require you schedule the tasks on site startup if you want to have commonly occurring tasks.

Another good use of Quartz is to keep non-critical tasks off the main thread. For example, you could schedule emails to send off after an action has completed.

The only downside of Quartz I can think of is **there's no UI to view tasks**, so it's still not transparent to non-developers what is going on.

There is an Umbraco package called <a href="https://our.umbraco.org/projects/backoffice-extensions/url-task-scheduler-for-v7/" target="_blank">Url Task Scheduler for V7</a> which uses Quartz for scheduling and provides a UI on an Umbraco dashboard. Though you should note this package is targeted at developers and there haven't been any recent updates to the package. Use at your own risk!

### Hangfire

<a href="https://www.hangfire.io/" target="_blank">Hangfire</a> is a full-featured solution for task scheduling as it even includes a beautiful UI which you can via a URL. The UI can tell you when tasks habe been called, when they completed and if an error occurred.

Hangfire assumes you have a MS SQL database and setting it up to use the database is super simple. But the best thing is some other Umbracians have written blog posts on integrating Hangfire with Umbraco. Check them out <a href="http://camaya.co/posts/2016/07/31/how-to-integrate-hangfire-with-umbraco/" target="_blank">here</a> and <a href="http://www.abstractmethod.co.uk/blog/2016/4/better-task-scheduling-in-umbraco/" target="_blank">here</a>.

Hangfire might be a little overkill if you want to setup a couple of simple reoccurring tasks, but for bigger websites, I can see a real benefit of using it.

### Windows Task Scheduler

Windows has a task scheduler built straight into it which can be used by programs or users.

The Task Scheduler is a similar solution to using the Umbraco built in scheduler, but with three clear advantages:

- you can set a time and date for a task to be called
- the task scheduling isn't affected by site and server restarts
- you can add error handling in (such as calling the task again if an error occurs)

The steps involve creating a script (such as a PowerShell script) which calls a web URL and waits for a response.

<!-- Should I add an example script here? -->

The downsides of this approach are:

- the task sits outside of the application which isn't transparent and can add technical debt to a project
- the UI can only be accessed by RDPing into the server

## Conclusion time

It's often that more complicated websites need to be able to run reoccurring tasks. Umbraco Scheduled Tasks can solve this issue, but it's not a silver bullet and can cause more problems than it solves.

It may be worth investing more time (and money) building a more resistant solution, but how you do that is up to you. Just note that a good task scheduling solution can do the following:

- schedule one off tasks (such as sending an email to a customer after they have signed up)
- have reoccurring tasks
- set a time or date for a future task to occur
- access a (secure) UI which can be used and understood by anyone
- allow for error handling

Have you got a solution you prefer? Or do you think Umbraco should include a better task scheduler in the core? You can contact me on <a href="https://twitter.com/Harvzor" target="_blank">Twitter</a> to let me know what you think!

