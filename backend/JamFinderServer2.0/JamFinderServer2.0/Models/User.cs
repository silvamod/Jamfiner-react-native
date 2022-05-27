using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Configuration;

namespace JamFinderServer2._0.Models
{

    public class User
    {
        public string email { get; set; }
        public string name { get; set; }
        public string profession { get; set; }
        public int experience { get; set; }
        public string location { get; set; }
        public string bio { get; set; }
        public string img { get; set; }
        public int isAdmin { get; set; }

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
                    string[] like = new string[2];
                    like[0] = (string)dr["user1"];
                    like[1] = (string)dr["user2"];
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

        public int addMatch(string match1, string match2)
        {
            SqlConnection con = null;

            try
            {
                con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

                String selectSTR = "INSERT INTO matches (user1,user2) VALUES ('" + match1 + "','" + match2 + "') " +
                    "INSERT INTO matches (user1,user2) VALUES ('" + match2 + "','" + match1 + "') ";
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