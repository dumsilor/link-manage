import { navLink } from "../../../shared/model/nav-link.model"

export const service_links: navLink[] =[
    {
      "name": "Client Association Portal (CA)",
      "url": "https://ca.brilliant.com.bd/"
    },
    {
      "name": "OpenStack Dashboard 1",
      "url": "http://118.67.215.11/dashboard/auth/login/?next=/dashboard/project/volumes/"
    },
    {
      "name": "OpenStack Dashboard 2",
      "url": "http://118.67.215.12/dashboard/auth/login/?next=/dashboard/project/volumes/"
    },
    {
      "name": "OpenStack Dashboard 3",
      "url": "http://118.67.215.13/dashboard/auth/login/?next=/dashboard/project/volumes/"
    },
    {
      "name": "OwnCloud Storage",
      "url": "http://storage.brilliant.com.bd/"
    },
    {
      "name": "Zimbra Admin",
      "url": "https://mail.brilliant.com.bd:9071/zimbraAdmin/"
    },
    {
      "name": "cPanel",
      "url": "https://cpanel.brilliant.com.bd:2087"
    },
    {
      "name": "MailBorder",
      "url": "https://master.intercloud.com.bd/index-login.php"
    },
    {
      "name": "Firewall Dashboard 1",
      "url": "https://118.67.210.46/"
    },
    {
        "name": "Firewall Dashboard 2",
        "url": "https://118.67.210.49/"
    },
    {
        "name": "Firewall Dashboard 3",
        "url": "https://118.67.210.61/"
    },
    {
        "name": "Commvault Command Center(baas)",
        "url": "baas.brilliant.com.bd"
    },
    {
        "name": "Commvault Command Center(backup)",
        "url": "backup.brilliant.com.bd"
    },
    {
        "name" : "SolidFire NetApp",
        "url" : "http://192.168.12.2"
    },
    {
        "name" : "NVMe NetApp",
        "url" : "http://192.168.12.20"
    },
  ]
  
  export const monitoring_tools_links: navLink[] = [
    {
        "name" : "Nagios",
        "url" : "http://nagios.brilliant.com.bd/nagios/"
    },
    {
        "name" : "Grafana",
        "url" : "http://grafana.brilliant.com.bd/login"
    },
    {
        "name" : "FortiAnalyzer",
        "url" : "https://118.67.209.115/p/login/"
    }
  ]

  export const tools_links: navLink[] = [
    {
      "name" : "Brilliant Speed Test",
      "url" : "http://103.209.42.218:10480"
    },
    {
        "name" : "MX ToolBox",
        "url" : "https://mxtoolbox.com"
    },
    {
        "name" : "Telia Looking Glass",
        "url" : "https://lg.telia.net"
    },
    {
        "name" : "Shodan Engine",
        "url" : "https://www.shodan.io"
    },
    {
      "name" : "HE Internet Services",
      "url" : "https://bgp.he.net"
  },
    {
      "name" : "YML Checker",
      "url" : "https://yamlchecker.com/"
    },
    {
      "name" : "IP Calculator",
      "url" : "https://jodies.de/ipcalc"
    }

  ]


  export const shift_tasks = [
    {
      "name" : "Client Delivery",
      "url" : "http://localhost:12180/delivery" //TODO: Fix the localhost Name after full client delivery development
    },
    {
      "name": "Monitoring Screenshots list",
      "url" : "https://s3.brilliant.com.bd/bucket-1-ee86738d/shift-tasks/regular-tasks.png"
    },
    {
      "name" : "Daily Infra Report",
      "url" : "https://docs.google.com/spreadsheets/d/1q5snkjEof6SF1oftgncQe1yETR6kCky-/edit?usp=sharing&ouid=112305840590759320964&rtpof=true&sd=true"
    }
  ]

  export const client_docs = [
    {
      "name": "Friendship Diagram",
      "url" : "https://s3.brilliant.com.bd/bucket-1-ee86738d/client-doc/friendship-diagram.html"
    }
  ]
