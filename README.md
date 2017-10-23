This is our new app("eduByte") which we built during an internship with Hasura using nodejs and JSON APIs provided by Hasura. It is a simple blogging app on which any user can read and write articles. It also gives the user an option of commenting on any article. This video goes through the functionalities of the app like a user manual.

Demo Video Link :  https://youtu.be/5hzjCEm95C8

# Quickstart - Build your own Docker image#

Build the Docker image using the following command

```bash
$ docker build -t nodejs-express:<tag> .
```

Run the Docker container using the command below.

```bash
$ docker run -d -p 8080:8080 nodejs-express:<tag>
```

# Quickstart - git based pipeline

Follow the steps mentioned below for git based pipeline

1. Ensure that you have a git project
2. Edit `app/src/server.js`
3. Commit your changes

    ```bash
    $ git add .
    $ git commit -m "message"
    ```

4. Push the changes to git

    ```bash
    $ git push <remote> master
    ```

# Advanced usage

### **Port**

Default Port for application is `8080` .
