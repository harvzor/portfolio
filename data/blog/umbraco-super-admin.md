*this article is up to date as of Umbraco 7.6.11 and 7.7.4*

So it turns out the first Umbraco user (the user which is created when you first setup your Umbraco application) has a little more power than you may expect. This first user is user 0 and they're given some extra privileges by default. Even if you create another user who is part of the **Administrators** group, they still won't be quite as important as this first user.

I refer to this user as "super admin" because if these extra privileges.

## Extra privileges

### The super admin cannot be disabled?

### Disabled users

Disabled users can only be seen by the admin unless a toggle is set in the Umbraco config.

### Other users can't see the super admin.

Users other than the super admin can't see this user.

### Creating content programmatically

All content (such as pages) and media (such as images) have the user which created them saved to them. So if you're logged in as Admin, it will say on the item's information tab that it was created by the user "Admin".

When content is created using the programmatic API, there is the option to specify which user created the content. If no user has been specified, it will default to user 0 which is the super admin. This may be confusing if the first user you created has your name. It will appear as if you're creating loads of content, when actually

