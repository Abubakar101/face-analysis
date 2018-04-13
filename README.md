# Project 4 - "Face Routing"

## Instructions
1. Run the docker
2. Run `npm install` in client directory
3. Run `idea build.gradle` in microsolutions directory
4. Serve!!

---
I built microservices app for this project which shows analysis with face recognition API using Face++. After you provide your photo, you get back the information about your age, ethnicity, your gender, beauty's scores, and your emotions. 



## A clear problem statement
"I need to have an app that allows me to upload my photos and then provide me the information based on my looks such as my age, gender, ethnicity, beauty's scores, and your emotions and I could preferencely save that information and favorite them."



## What business problem are you trying to solve with technology?
"I'm trying to make the interactions with two people or more much better and we want to learn how a person or people interact with each other and what kind of conversations lead to what results. We can do that by analyzing through the Face++ API to show the body language of them."


## Clearly present technical requirements of solving the business problem
"I want the app to use Java, SpringBoot, Docker, PSQL, and React"



## Explain how to breakdown the monolithic service & How to make the monolithic service scalable
We can break down large monolithic app into small apps based on their categories like small departments for stores, and then use api-gateway service to initialize the URLs and use eureka to connect them together and docker as a container for whole app.


## The pros/cons of implementing a monolithic problem
- Pros: Less work in implementing, less space required
- Cons: Havey load on single server or port, hard to manage

## How the microservice will solve the companies problems
There would be different departments to solve the problems without interfering with each other while the services continue to function properly because they would not be connected to each other directly and one could be shut down while other services continue to run. Great example is cloud servers, where we could only run those services that are in need and don't need to run the whole app for a single data request = saving $$$$.

## How you would maintain such a project with costs considerations in mind.
"There are many possibilities such as that we could work with retails stores to increase their sales based on the customers' body language and behaviors inside the store."


---
### Features that can be added.
- User authentication and authorization - using firebase 
- Same image sizes
- Push it to AWS
- Choose the right graphs (First One)

--- 
#### Logs
- [April 13, 2018] Able to upload Photos
- [April 11, 2018] Select | Unselect multiple cards to delete 

