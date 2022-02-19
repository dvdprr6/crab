# Crab 🦀
Crab is a mobile application for Android OS that will help the user keep track of their spending habits for each month. 
The user will include any expenses and revenue accrued during that month. The mobile application will provide statistics on how much money they are saving.

Technology Components
- React Native
- Android OS
- Java
- RealmDb

Pages
1. Splash Page
2. Dashboard Page
3. Month Page
4. History Page
   - Display history of selected month page

###Splash Page
The Splash Page will display a loading icon as well as the application's logo.

###Dashboard Page
The Dashboard Page will display statistical information of the users overall spending and savings over the year.

This page is broken down into three sections:
- Status section which will display the overall health of the users spending habits. Green for under-budget, Yellow for 20% under-budget, and Red for at or over-budget
- Display of total spending and savings
- Pie Chart section for visual representations
- Highest Purchase section to display what was the most recent expense purchase

###Month Page
The Month Page will display the current Month's Budget, Month's Spending, and Expense and Revenue Items. The user will be able
to add, update, and delete Revenue and Expense Items. When new Expense or Revenue Items are added for the month, the Month's
Budget and Spending is re-calculated.

Revenue and Expense item can be re-occurring, meaning that the Item will re-appear next month on the Month Page

###History Page
The History Page will display the Budget and Spending for the previous months which will also include a Pie Chart.
Selected one of the months will provide a detailed view of that month.
