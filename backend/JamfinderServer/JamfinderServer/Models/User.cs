using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Configuration;

namespace JamfinderServer.Models
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

        public User()
        {

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