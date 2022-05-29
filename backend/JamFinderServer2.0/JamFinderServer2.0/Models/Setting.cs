using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace JamFinderServer2._0.Models
{
    public class Setting
    {
        public string Email { get; set; }
        public string Miles { get; set; }
        public string Skill { get; set; }
        public bool Male { get; set; }
        public bool Female { get; set; }
        public string selectedItems { get; set; }


        public Setting()
        {

        }

        public String upDateSttings(String setting)
        {
            Console.WriteLine(setting);
            return setting;
        }

    }
}