I used PostgreSQL from my local PC , you can find its url from knex file , just have to change back to yours

After that please run migrations and seed since for authentication I am creating two more coloumns in Customer table , email and password and run the seed file to populate ,the emails are firstname+@gmail.com and passwords are firstname+123 (hashed value , using bcrypt 10 rounds)

1st i have uploaded .env file since it is a private repo , 2nd i have used Raw SQL even though knex ORM is in project because it is was this way in the code given

- npm i //to install new dependencies
- npx knex migrate:latest --env development //to run migrations
- npx knex seed:run --env=development //to run seeds
- then nodemon (node server.js)


to get the token run the Customer Post api , localhost:3000/customer and add email and password in body i.e

{
    "email": "liam@gmail.com",
    "password" : "liam123"
}

![image](https://github.com/mujtabadustox/monke-task/assets/90598402/8eafa0d4-3dee-474b-9640-ad3a3f9173d2)



after getting the token please ut token in postman Header by creating key Authorization and value Bearer [token],
I havent tried with postmans built in Authorization Tab but that should work too

![image](https://github.com/mujtabadustox/monke-task/assets/90598402/cbaf1010-a5aa-4256-890a-5562fc5ba3cf)


the get apis are simple

for post and put

post order 

send this body and token in header

{
    "customer_id" : 1 ,
    "products" : [
        {
            "product_id" : 8 ,
            "quantity" : 17
        },
        {
            "product_id" : 9 ,
            "quantity" : 23
        }
    ]
}

![image](https://github.com/mujtabadustox/monke-task/assets/90598402/ec2ec181-a9f6-4fd2-ac2d-7f79fee6d473)


for put request send this body and token in header

![image](https://github.com/mujtabadustox/monke-task/assets/90598402/b3c3ff4e-a18c-42f6-ae38-c54a408b6580)

![image](https://github.com/mujtabadustox/monke-task/assets/90598402/88883711-d9e5-4f65-bcec-8643852e3e1f)

![image](https://github.com/mujtabadustox/monke-task/assets/90598402/89ddf728-016e-41f9-9867-66fab11395dc)

I havent tested this fully but it works for a dummy backend , sometimes values get bad because of mutation i am using very bad logic , using let keyword etc , I havent thought on it much , but it does work 99% of the time , it can be better i will do later if i get time for now for this task i feel like it is ok


Thank you






