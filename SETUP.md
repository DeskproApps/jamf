Jamf Pro Setup Instructions
===

To install the Jamf Pro App, you must first create an app with a "Client ID" and "Client Secret".

Once you've logged in, click on "Settings" menu item at the bottom left of the screen

After logging in, navigate to the "Settings" option in the sidebar menu, then utilize the search input to locate the "API roles and clients" item.

[![](/docs/assets/setup/setup-jamf-01.png)](/docs/assets/setup/setup-jamf-01.png)

Select it to proceed with configuring a new client.

[![](/docs/assets/setup/setup-jamf-02.png)](/docs/assets/setup/setup-jamf-02.png)

Then, click on __"+ New"__ to establish a new role for our forthcoming application.

Here, we fill out the following fields:
1. Provide the __Display Name__ as "Deskpro App API Role" (or any preferred name);
2. Choose the __Privileges__ - "Read Computers", "Read Advanced Computer Searches", "Read Mobile Devices", "Read Advanced Mobile Device Searches".

[![](/docs/assets/setup/setup-jamf-03.png)](/docs/assets/setup/setup-jamf-03.png)

Click on "Save" and return and navigate to the "API Clients" tab. Then click on __"+ New"__ to create a new client.

[![](/docs/assets/setup/setup-jamf-04.png)](/docs/assets/setup/setup-jamf-04.png)

Here, we fill out the following fields:
1. Provide the __Display Name__ as "Deskpro App" (or any preferred name);
2. Select the __API Roles__ that we made in the previous step;
3. Set the __Access Token Lifetime__ to 3600 sec or your preferred duration;
4. And __Enable API client__.

[![](/docs/assets/setup/setup-jamf-05.png)](/docs/assets/setup/setup-jamf-05.png)

Click on "Save". And here click "Generate client secret"

[![](/docs/assets/setup/setup-jamf-06.png)](/docs/assets/setup/setup-jamf-06.png)

In the opened window, click "Create secret".

[![](/docs/assets/setup/setup-jamf-07.png)](/docs/assets/setup/setup-jamf-07.png)

[![](/docs/assets/setup/setup-jamf-08.png)](/docs/assets/setup/setup-jamf-08.png)

Ok, head back to Deskpro and enter your __Jamf Instance URL__, __Client ID__ and __Client secret__ into the app settings form.

[![](/docs/assets/setup/setup-jamf-09.png)](/docs/assets/setup/setup-jamf-09.png)

Click on the "Permissions" tab and select the users/groups that you'd like to have access to the Jamf Pro App.

When you're happy - click __Install__.

