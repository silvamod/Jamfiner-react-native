﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Configuration;
using System.Text.Json.Serialization;
using System.Collections;
using System.Reflection;
using Newtonsoft.Json.Linq;

namespace JamFinderServer2._0.Models
{

    public class User
    {
        public string email { get; set; }
        public string name { get; set; }
        public string genres { get; set; }
        public string profession { get; set; }
        public int experience { get; set; }
        public string location { get; set; }
        public string bio { get; set; }
        public string img { get; set; }
        public int isAdmin { get; set; }
        public string score { get; set; }

        public User()
        {

        }
        public User(string email, string name, string bio)
        {
            this.email = email;
            this.name = name;
            this.bio = bio;
            this.img = "https://www.kindpng.com/picc/m/21-214439_free-high-quality-person-icon-default-profile-picture.png";
        }
        public User(string email, string name, string profession, int experience, string location, string bio, string img)
        {
            this.email = email;
            this.name = name;
            this.profession = profession;
            this.experience = experience;
            this.location = location;
            this.bio = bio;
            this.img = img;
        }
        public SqlConnection connect(String conString)
        {
            // read the connection string from the configuration file
            string cStr = WebConfigurationManager.ConnectionStrings[conString].ConnectionString;
            SqlConnection con = new SqlConnection(cStr);
            con.Open();
            return con;
        }
        public List<string[]> getAllMatches()
        {
            SqlConnection con = null;
            List<User> users = new List<User>();
            List<string[]> MatchList = new List<string[]>();

            try
            {
                con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

                String selectSTR = "select * from matches";
                SqlCommand cmd = new SqlCommand(selectSTR, con);

                // get a reader
                SqlDataReader dr = cmd.ExecuteReader(System.Data.CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end

                while (dr.Read())
                {   // Read till the end of the data into a 
                    string[] like = new string[4];
                    like[0] = (string)dr["user1"];
                    like[1] = (string)dr["user2"];
                    //var Date = Convert.ToDateTime(reader["YOUR_DATE_COLUMN"]);
                    //var Time = (TimeSpan)reader["YOUR_TIME_COLUMN"];
                    like[2] = Convert.ToString(dr["score"]);
                    //like[3] = getMutualGenres(users, like[0], like[1]); //todo:
                    //like[3] = getMutualGenres(users, like[0], like[1]);
                    MatchList.Add(like);
                }
                //TODO: Print result
                return MatchList;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                if (con != null)
                {
                    con.Close();
                }

            }

        }
        //todo:

        //public string getMutualGenres(List<User> users, string targetuser1,string targetuser2)
        //{
        //    User user1 = new User();
        //    User user2 = new User();
        //    for (int i=0; i<users.Count; i++)
        //    {
        //        if (string.Equals(users[i].email, targetuser1))
        //            user1 = users[i];
        //        if (string.Equals(users[i].email, targetuser2))
        //            user2 = users[i];
        //    }
           
            
        //       return user1.genres.Intersect(user2.genres);
            
        //            user1 = users[i];
        //    }

        //    return user1.genres.Intersect(user2.genres);

        //}
        //}
        
        public List<string[]> getLikes()
        {
            SqlConnection con = null;
            List<string[]> LikeList = new List<string[]>();

            try
            {
                con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

                String selectSTR = "select * from likes";
                SqlCommand cmd = new SqlCommand(selectSTR, con);

                // get a reader
                SqlDataReader dr = cmd.ExecuteReader(System.Data.CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end

                while (dr.Read())
                {   // Read till the end of the data into a 
                    string[] like = new string[2];
                    like[0] = (string)dr["_user"];
                    like[1] = (string)dr["target"];
                    LikeList.Add(like);
                }
                //TODO: Print result
                return LikeList;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                if (con != null)
                {
                    con.Close();
                }

            }

        }
        public int addToDB()
        {
            SqlConnection con = null;

            try
            {
                con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

                String selectSTR = "INSERT INTO Users (email,username,profession,experience,location,bio,img,isAdmin) " +
                    "VALUES('" + this.email + "', '" + this.name + "', 'Cello', 0, 'israel', '" + this.bio + "', " +
                    "'" + this.img + "',0)";
                SqlCommand cmd = new SqlCommand(selectSTR, con);
                // get a reader
                cmd.ExecuteReader(System.Data.CommandBehavior.CloseConnection);  // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
                return 1;
            }
            catch (Exception ex)
            {
                return 0;
            }
            finally
            {
                if (con != null)
                {
                    con.Close();
                }

            }

        }
        //Changes users image!
        public int changeImg(string img, string email)
        {

            SqlConnection con = null;

            try
            {
                con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

                String selectSTR = "UPDATE Users SET img='" + img + "' WHERE email='" + email + "'";
                SqlCommand cmd = new SqlCommand(selectSTR, con);
                // get a reader
                cmd.ExecuteReader(System.Data.CommandBehavior.CloseConnection);  // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
                return 1;
            }
            catch (Exception ex)
            {
                return 0;
            }
            finally
            {
                if (con != null)
                {
                    con.Close();
                }

            }

        }
        public int checkMatch(string user, string targetUser)
        {
            SqlConnection con = null;
            User User = new User();

            try
            {
                con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

                String selectSTR = "select * from likes where _user = '" + targetUser + "' AND target = '" + user + "'";
                SqlCommand cmd = new SqlCommand(selectSTR, con);

                // get a reader
                SqlDataReader dr = cmd.ExecuteReader(System.Data.CommandBehavior.CloseConnection);  // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
                if (dr.Read())
                {
                    return 1;
                }
                return 0;

            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                if (con != null)
                {
                    con.Close();
                }

            }

        }
        public List<User> getMatches(string targetUser)
        {
            SqlConnection con = null;
            List<User> UserList = new List<User>();

            try
            {
                con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

                String selectSTR = "SELECT  * FROM Users INNER JOIN(SELECT user2 from matches WHERE user1 = '" + targetUser + "') AS a ON Users.email = a.user2";
                SqlCommand cmd = new SqlCommand(selectSTR, con);

                // get a reader
                SqlDataReader dr = cmd.ExecuteReader(System.Data.CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end

                while (dr.Read())
                {   // Read till the end of the data into a 
                    User user = new User();
                    user.email = (string)dr["email"];
                    user.name = (string)dr["username"];
                    user.profession = (string)dr["profession"];
                    user.experience = (int)dr["experience"];
                    user.location = (string)dr["location"];
                    user.bio = (string)dr["bio"];
                    user.img = (string)dr["img"];
                    UserList.Add(user);
                }
                //TODO: Print result
                return UserList;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                if (con != null)
                {
                    con.Close();
                }

            }

        }

        //adds 2 users into match table containing their emails and matching score.
        //TODO::
        public int addMatch(string match1, string match2, float score)
        {
            SqlConnection con = null;

            try
            {
                con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

                String selectSTR = "INSERT INTO matches (user1,user2,score) VALUES ('" + match1 + "','" + match2 +"','"+score+ "') " +
                    "INSERT INTO matches (user1,user2,score) VALUES ('" + match2 + "','" + match1 + "','" + score + "') ";
                SqlCommand cmd = new SqlCommand(selectSTR, con);
                // get a reader
                cmd.ExecuteReader(System.Data.CommandBehavior.CloseConnection);  // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
                return 1;
            }
            catch (Exception ex)
            {
                return 0;
            }
            finally
            {
                if (con != null)
                {
                    con.Close();
                }

            }


        }
        public void addLike(string user, string targetUser)
        {
            SqlConnection con = null;

            try
            {
                con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

                String selectSTR = "INSERT INTO likes (_user,target) VALUES ('" + user + "','" + targetUser + "')";
                SqlCommand cmd = new SqlCommand(selectSTR, con);
                // get a reader
                cmd.ExecuteReader(System.Data.CommandBehavior.CloseConnection);  // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end

            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                if (con != null)
                {
                    con.Close();
                }

            }
        }
        public List<String> getLikes(string email) // returns like table for requested user.
        {
            SqlConnection con = null;
            List<String> likes = new List<String>();

            try
            {
                con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

                String selectSTR = "SELECT target from likes where _user = '" + email + "'";
                SqlCommand cmd = new SqlCommand(selectSTR, con);

                // get a reader
                SqlDataReader dr = cmd.ExecuteReader(System.Data.CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
                User user = new User(); ;
                while (dr.Read())
                {   // Read till the end of the data into a row
                    likes.Add((string)dr["target"]);

                }
                //TODO: Print result
                return likes;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                if (con != null)
                {
                    con.Close();
                }

            }

        }
        public User getUser(string email)
        {
            SqlConnection con = null;
            User User = new User();

            try
            {
                con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

                String selectSTR = "SELECT * from Users where email = '" + email + "'";
                SqlCommand cmd = new SqlCommand(selectSTR, con);

                // get a reader
                SqlDataReader dr = cmd.ExecuteReader(System.Data.CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
                User user = new User(); ;
                while (dr.Read())
                {   // Read till the end of the data into a row
                    user.email = (string)dr["email"];
                    user.name = (string)dr["username"];
                    user.profession = (string)dr["profession"];
                    user.experience = (int)dr["experience"];
                    user.location = (string)dr["location"];
                    user.bio = (string)dr["bio"];
                    user.img = (string)dr["img"];
                    user.isAdmin = (int)dr["isAdmin"];
                }
                //TODO: Print result
                return user;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                if (con != null)
                {
                    con.Close();
                }

            }

        }
        public int addOrUpdateUser(string email, string name, string bio, string img)
        {
            string setQuery = "";

            List<User> Users = getUsers();
            bool foundflag = false;
            foreach (User user in Users)
            {
                if (user.email == email)
                {
                    foundflag = true;
                    //if (user.name != name)
                    //if (user.bio != bio)
                    if (user.img != img)
                    {
                        UpdateUserImage(img, user.email);
                    }
                    //here


                }

            }
            if (!foundflag)
            {
                this.email = email;
                this.name = name;
                this.bio = bio;
                this.img = img;
                addToDB();
                return 1;
            }


            return 0;
        }
        public List<User> getSearchedUsers(string targetUser)
        {
            List<User> users = getUsers();
            List<User> returnList = new List<User>();
            Dictionary<string, string[]> Users = new Dictionary<string, string[]>();
            Random _random = new Random();
            string responseFromServer;
            foreach (User user in users)
            {
                //user.genger
                //TODO: bring real gen from Database and change the format (hint : with spilt function)!
                string[] gen = new string[] { "country rock", "danish metal", "chill pop", "pop rock", "british country" };
                Users.Add(user.email, user.genres.Split(','));
            }

            var jsonobj = new Dictionary<string, Dictionary<string, string[]>>
            {
                ["Users"] = Users
            };
            

            var json = JsonConvert.SerializeObject(jsonobj);

            byte[] byteArray = Encoding.UTF8.GetBytes(json);
            WebRequest request = WebRequest.Create("http://omer3020.pythonanywhere.com/algo/"+ targetUser);
            //request.Credentials = CredentialCache.DefaultCredentials;
            request.Method = "POST";
            request.ContentType = "application/json";
            // Set the ContentLength property of the WebRequest.
            request.ContentLength = byteArray.Length;
            request.Timeout = 600000;
            // Get the request stream.
            Stream dataStream = request.GetRequestStream();
            // Write the data to the request stream.
            dataStream.Write(byteArray, 0, byteArray.Length);
            // Close the Stream object.
            dataStream.Close();

            // Get the response.
            WebResponse response = request.GetResponse();
            // Display the status.
            Console.WriteLine(((HttpWebResponse)response).StatusDescription);
            using (dataStream = response.GetResponseStream())
            {
                // Open the stream using a StreamReader for easy access.
                StreamReader reader = new StreamReader(dataStream);
                // Read the content.
                responseFromServer = reader.ReadToEnd();
                // Display the content.
                Console.WriteLine(responseFromServer);
                response.Close();
                //return responseFromServer;
            }

            //var pyResults = JsonConvert.DeserializeObject(responseFromServer);
            var dataObj = JObject.Parse(responseFromServer);

            //var result = ((IEnumerable)pyResults).Cast<object>().ToList();
            List<KeyValuePair<string, string>> pyResults1 = new List<KeyValuePair<string, string>>();
            var dataObj1 = dataObj.First;
            for (int i = 0; i < dataObj.Count; i++)
            {
                pyResults1.Add(new KeyValuePair<string, string>(dataObj1.Last.ToString(), dataObj1.First.Path.Replace("[", "").Replace("]", "").Replace("'", "")));
                if (dataObj1.Next != null)
                {
                    dataObj1 = dataObj1.Next;
                }

            }

            pyResults1 = pyResults1.OrderBy(o => o.Value).ToList();
            foreach (KeyValuePair<string, string> res in pyResults1)
            {
                users.Find(x => x.email == res.Value).score = res.Key;
                returnList.Add(users.Find(x => x.email == res.Value));

            }
            //return responseFromServer;
            return returnList;

            // Close the response.
        }

        public int AddGenresToUser(string genres,string email)
        {
            SqlConnection con = null;

            try
            {
                con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

                String selectSTR = "UPDATE users SET genres = '" + genres + "' WHERE email='" + email + "'";
                SqlCommand cmd = new SqlCommand(selectSTR, con);
                // get a reader
                cmd.ExecuteReader(System.Data.CommandBehavior.CloseConnection);  // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
                return 1;
            }
            catch (Exception ex)
            {
                return 0;
            }
            finally
            {
                if (con != null)
                {
                    con.Close();
                }

            }
        }

        public int UpdateUserImage(string img, string email)
        {
            SqlConnection con = null;

            try
            {
                con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

                
                String selectSTR = "UPDATE Users SET img = '"+img+"' WHERE email = '" + email + "'";
                SqlCommand cmd = new SqlCommand(selectSTR, con);
                // get a reader
                cmd.ExecuteReader(System.Data.CommandBehavior.CloseConnection);  // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
                return 1;
            }
            catch (Exception ex)
            {
                return 0;
            }
            finally
            {
                if (con != null)
                {
                    con.Close();
                }

            }
        }
        public List<User> getUsers()
        {
            SqlConnection con = null;
            List<User> UserList = new List<User>();

            try
            {
                con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

                String selectSTR = "SELECT * from Users";
                SqlCommand cmd = new SqlCommand(selectSTR, con);

                // get a reader
                SqlDataReader dr = cmd.ExecuteReader(System.Data.CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end

                while (dr.Read())
                {   // Read till the end of the data into a row
                    User user = new User();
                    user.email = (string)dr["email"];
                    user.name = (string)dr["username"];
                    user.profession = (string)dr["profession"];
                    user.experience = (int)dr["experience"];
                    user.location = (string)dr["location"];
                    user.bio = (string)dr["bio"];
                    user.img = (string)dr["img"];
                    user.genres = (string)dr["genres"];
                    UserList.Add(user);
                }
                //TODO: Print result
                return UserList;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                if (con != null)
                {
                    con.Close();
                }

            }

        }

    }
}