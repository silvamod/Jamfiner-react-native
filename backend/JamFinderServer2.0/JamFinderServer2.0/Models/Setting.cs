using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace JamFinderServer2._0.Models
{
    public class Setting
    {
        public string email { get; set; }
        public int  miles { get; set; }
        public string skill { get; set; }
        public bool male { get; set; }
        public bool female { get; set; }
        public string[] selectedItems { get; set; }


        public Setting()
        {

        }

        public Setting(string email, int miles, string skill, bool male, bool female, string[] selectedItems)
        {
            this.email = email;
            this.miles = miles;
            this.skill = skill;
            this.male = male;
            this.female = female;
            this.selectedItems = selectedItems;
        }

        //updates settings of a specified user email in the database.
        //TODO::
        //public Setting upDateSttings(Setting setting)
        //{
        //    SqlConnection con = null;

        //    try
        //    {
        //        (skill, instruments, miles, male, female)
        //          con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

        //        String selectSTR = "UPDATE settings SET skill='"+ setting.skill+"' miles='"+setting.miles+"' instruments='"+setting.selectedItems+"' male='"+setting.male+"' female='"+setting.female+"' WHERE email='"+setting.email+"'";
        //        SqlCommand cmd = new SqlCommand(selectSTR, con);
        //        // get a reader
        //        cmd.ExecuteReader(System.Data.CommandBehavior.CloseConnection);  // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end

        //    }
        //    catch (Exception ex)
        //    {
        //        // write to log
        //        throw (ex);
        //    }
        //    finally
        //    {
        //        if (con != null)
        //        {
        //            con.Close();
        //        }

        //    }
        //}

    }
}