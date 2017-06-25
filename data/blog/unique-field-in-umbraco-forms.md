Recently I was given the task of ensuring that each email put into a custom Umbraco Forms form would be unique.

I managed to extend Umbraco Forms by adding a new field type. This new field type takes the user's current input and compares it with previous submissions. If the current input is not unique, it will return an error.

This is useful in scenarios where you don't want someone to attempt to submit duplicate information.

The C#:

```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Umbraco.Core;
using Umbraco.Forms.Core;
using Umbraco.Forms.Mvc.DynamicObjects;

namespace MySite.Core.Models.FieldTypes
{
    public class UniqueField : Umbraco.Forms.Core.FieldType
    {
        public UniqueField()
        {
            this.Id = new Guid("2c27f3b0-5f8f-4099-b1ce-944cac182f47");
            this.Name = "Unique Field";
            this.Description = "Render a unique field.";
            this.Icon = "icon-autofill";
            this.DataType = FieldDataType.String;
            this.SortOrder = 10;
            this.SupportsRegex = true;
        }

        public override IEnumerable<string> ValidateField(Form form, Field field, IEnumerable<object> postedValues, HttpContextBase context)
        {
            var returnStrings = new List<string>();

            // This requires MultipleActiveResultSets=True; on the connectionstring!
            var records = Library.GetRecordsFromForm(form.Id.ToString());

            // Check to see if any of the form records have this field and the values are equal.
            if (records.Items
                .Any(record =>
                    record.RecordFields.Any(recordField =>
                        recordField.Value.Alias == field.Alias
                        && recordField.Value.Values.First().ToString().InvariantEquals(postedValues.First().ToString())
                    )
                )
            )
            {
                returnStrings.Add("Please enter a unique value.");
            }

            returnStrings.AddRange(base.ValidateField(form, field, postedValues, context));

            return returnStrings;
        }
    }
}
```

And the view (to be placed at `/Views/Partials/Forms/Fieldtypes/FieldType.UniqueEmailField.cshtml`):

```
@model Umbraco.Forms.Mvc.Models.FieldViewModel
<input type="text" name="@Model.Name" id="@Model.Id" class="text" value="@Model.Value" maxlength="500"
       @{if (string.IsNullOrEmpty(Model.PlaceholderText) == false) { <text> placeholder="@Model.PlaceholderText" </text> }}
       @{if (Model.Mandatory || Model.Validate) { <text> data-val="true" </text> }}
       @{if (Model.Mandatory) { <text> data-val-required="@Model.RequiredErrorMessage" </text> }}
       @{if (Model.Validate) { <text> data-val-regex="@Model.InvalidErrorMessage" data-regex="@Html.Raw(Model.Regex)" </text> }} />
```

The only downside of my above method is that the uniqueness of the input is not checked using JS, only when the form is actually submitted.

