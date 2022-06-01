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

        public Setting upDateSttings(Setting setting)
        {
            Console.WriteLine(setting);
            return setting;
        }

    }
}