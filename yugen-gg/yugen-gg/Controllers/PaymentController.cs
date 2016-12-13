using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;

namespace yugen_gg.Controllers
{
    public class PaymentController : Controller
    {
        // GET: Payment
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult IPN()
        {
            // Receive IPN request from PayPal and parse all the variables returned
            var formVals = new Dictionary<string, string>();
            formVals.Add("cmd", "_notify-synch"); //notify-synch_notify-validate
            formVals.Add("at", "si-ybLuZaapE9ySInDhgmULM2Xoc8IxPot3IKq2LP240wkkRNT9rx_a6kSK"); // this has to be adjusted
            formVals.Add("tx", Request["tx"]);
            formVals.Add("test", "HELLOWORLD");

            string response = GetPayPalResponse(formVals, true);


            if(response.Contains("SUCCESS"))
            {
                string transactionID = GetPDTValue(response, "txn_id"); // txn_id //d
                string sAmountPaid = GetPDTValue(response, "mc_gross"); // d
                string deviceID = GetPDTValue(response, "custom"); // d
                string payerEmail = GetPDTValue(response, "payer_email"); // d
                string Item = GetPDTValue(response, "item_name");

                //validate the order
                Decimal amountPaid = 0;
                Decimal.TryParse(sAmountPaid, System.Globalization.NumberStyles.Number, System.Globalization.CultureInfo.InvariantCulture, out amountPaid);

                if (amountPaid == 9)  // you might want to have a bigger than or equal to sign here!
                {
                    //If the correct amount was paid, make a call to the Javascript method to write to firebase
                    var url = "yugen-a088d.firebaseapp.com";

                    HttpClient client = new HttpClient();
                    client.BaseAddress = new Uri(url);

                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                    HttpResponseMessage responseMessage = client.GetAsync("").Result;

                    if(responseMessage.IsSuccessStatusCode)
                    {

                    }
                }
                else
                {
                    //Payment failed because they paid the incorrect amount. I don't think this is possible...?
                }
            }

            return View();
        }

        string GetPayPalResponse(Dictionary<string, string> formVals, bool useSandbox)
        {

            ServicePointManager.Expect100Continue = true;
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;

            string paypalUrl = useSandbox ? "https://www.sandbox.paypal.com/cgi-bin/webscr"
                : "https://www.paypal.com/cgi-bin/webscr";

            HttpWebRequest req = (HttpWebRequest)WebRequest.Create(paypalUrl);

            // Set values for the request back
            req.Method = "POST";
            req.ContentType = "application/x-www-form-urlencoded";

            byte[] param = Request.BinaryRead(Request.ContentLength);
            string strRequest = Encoding.ASCII.GetString(param);

            StringBuilder sb = new StringBuilder();
            sb.Append(strRequest);

            foreach (string key in formVals.Keys)
            {
                sb.AppendFormat("&{0}={1}", key, formVals[key]);
            }
            strRequest += sb.ToString();
            req.ContentLength = strRequest.Length;

            //for proxy
            //WebProxy proxy = new WebProxy(new Uri("http://urlort#");
            //req.Proxy = proxy;
            //Send the request to PayPal and get the response
            string response = "";
            using (StreamWriter streamOut = new StreamWriter(req.GetRequestStream(), System.Text.Encoding.ASCII))
            {

                streamOut.Write(strRequest);
                streamOut.Close();
                using (StreamReader streamIn = new StreamReader(req.GetResponse().GetResponseStream()))
                {
                    response = streamIn.ReadToEnd();
                }
            }

            return response;
        }

        string GetPDTValue(string pdt, string key)
        {

            string[] keys = pdt.Split('\n');
            string thisVal = "";
            string thisKey = "";
            foreach (string s in keys)
            {
                string[] bits = s.Split('=');
                if (bits.Length > 1)
                {
                    thisVal = bits[1];
                    thisKey = bits[0];
                    if (thisKey.Equals(key, StringComparison.InvariantCultureIgnoreCase))
                        break;
                }
            }
            return thisVal;

        }
    }
}