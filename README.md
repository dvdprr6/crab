# Crab 🦀
Crab is a mobile application for Android OS that will help the user keep track of their spending 
habits for each month. The user will register the total of their bi-weekly pay after taxes per month
on the mobile application. During that month the user will include any accrued spening during that
month, the mobile application will provide statistics on how much money they are saving.

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
   1. Display history of selected month page
5. Settings Page

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
The Month Page will display the Months Budget, Months Spending, and Expense Items. 
The user will be able to add, update, and delete Expense Items. When new Expense Items 
are added for the month, the month's spending is re-calculated with the new Expense Item.

Expense items can be re-occurring, meaning when an Expense Item is marked as re-occurring the
Expense Item will re-appear next month and automatically be calculated in the Months Spending.

###History Page
The History Page will display the Budget and Spending for the previous months which will also include a Pie Chart.
Selected one of the months will provide a detailed view of that month.

###Settings Page
The Settings Page will display application based features. For the moment it will allow the user to set their budget.
