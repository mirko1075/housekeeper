# housekeeper

Models:



```
 User:{
    username: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    password: String,
    image: String,
   	admin: {type: Boolean, default: false},
   	household: {type: Schema.Types.ObjectId, ref:"Household"},
   	currentScore: {type: Number, deafult: 0, required: true},
   	shifts: [{type: Schema.Types.ObjectId, ref:"Shift"}],
   	pendingTasks: [{type: Schema.Types.ObjectId, ref:"Shift"}],
    completedTasks: [{type: Schema.Types.ObjectId, ref:"Shift"}],
}
```

```
Task:{
    title: {type: String, required: true},
    description: String,
    deadline: Date,
    points: Number,
    publishedBy: {type: Schema.Types.ObjectId, ref:"User"},
    assignedTo: {type: Schema.Types.ObjectId, ref:"User"},
    isPending: {type: Boolean, default: false},
    isExpired: {type: Boolean, default: false},
    comments: [ commentSubschema ],
    reactions: [ reactionSubschema ]
}

reactionSubschema:{
    userId: {type: Schema.Types.ObjectId, ref:"User"},
    reaction: {type: String, enum: ["applause", "like-neutral", "heart", "celebrate", "surprised-face"]}
}

commentSubschema: {
    serId: {type: Schema.Types.ObjectId, ref:"User"},
    comment: String,
    imageUrl: String
}
```

```
Household:
{
    title: {type: String, default: "Our home", required: true},
    admin: {type: Schema.Types.ObjectId, ref:"User"},
    roommates: [{type: Schema.Types.ObjectId, ref:"User"}],
    expenses: [{type: Schema.Types.ObjectId, ref:"Expense"}],
    shifts: [{type: Schema.Types.ObjectId, ref:"Shift"}],
    shoppingList: [{type: Schema.Types.ObjectId, ref:"ShoppingItem"}],
    upcomingWeeklyReport: {type: Schema.Types.ObjectId, ref:"Report"},
    upcomingMonthlyReport: {type: Schema.Types.ObjectId, ref:"Report"},
    reportHistory: [ {type: Schema.Types.ObjectId, ref:"Report"} ]
}
Report: {
    startDate: Date,
    endDate: Date,
    frequency: {type: String, enum: ["weekly", "monthly"]},
    stats: [ {user: {type: Schema.Types.ObjectId, ref:"User"}, score: Number}]
}
```

```
ShoppingItem: {
    title: {type: String, required: true},
    quantity: {type: Number},
    unit: {type: String, enum: ['pcs', 'kg', 'lt', 'pack']}
}
```

```
Expense: 
{
    paidBy: {type: Schema.Types.ObjectId, ref:"User"},
    title: {type: String, required: true},
    amount: {type: Number, required: true}
}
```

```
Shift: 
{   title: {type: String, required: true}
    description: String
    points: Number,
    nextTask: {type: Schema.Types.ObjectId, ref:"Task"},
    upcomingTasks: [ {type: Schema.Types.ObjectId, ref:"Task"},
                    {type: Schema.Types.ObjectId, ref:"Task"}, 
                    {type: Schema.Types.ObjectId, ref:"Task"},
                    {type: Schema.Types.ObjectId, ref:"Task"}]
}
```
