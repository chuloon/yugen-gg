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
using FireSharp.Interfaces;
using FireSharp.Config;
using FireSharp;
using FireSharp.Response;
using System.Net.Mail;

namespace yugen_gg.Controllers
{
    public class PaymentController : Controller
    {
        // GET: Payment
        public ActionResult Index()
        {
            return View();
        }

        public async System.Threading.Tasks.Task<ActionResult> IPN()
        {
            // Receive IPN request from PayPal and parse all the variables returned
            var formVals = new Dictionary<string, string>();
            formVals.Add("cmd", "_notify-synch"); //notify-synch_notify-validate
            formVals.Add("at", "f8joYpcZABMVhK8wNpcdWsVlmLmQ_N1-48FX3gb5YPXSU4SA0wKanTQwZvy"); // this has to be adjusted
            formVals.Add("tx", Request["tx"]);

            string response = GetPayPalResponse(formVals, false);


            if (response.Contains("SUCCESS"))
            {
                string transactionID = GetPDTValue(response, "txn_id"); // txn_id //d
                string sAmountPaid = GetPDTValue(response, "mc_gross"); // d
                string buyerID = GetPDTValue(response, "custom"); // d
                string payerEmail = GetPDTValue(response, "payer_email"); // d
                string Item = GetPDTValue(response, "item_name");

                //validate the order
                Decimal amountPaid = 0;
                Decimal.TryParse(sAmountPaid, System.Globalization.NumberStyles.Number, System.Globalization.CultureInfo.InvariantCulture, out amountPaid);

                IFirebaseConfig config = new FirebaseConfig
                {
                    AuthSecret = "OsprEPZtYgU1bP2xKP3OVujZIPt7tNo0BLrg0gO4",
                    BasePath = "https://yugen-a088d.firebaseio.com/"
                };

                IFirebaseClient client = new FirebaseClient(config);

                var setFlag = new paidFlag
                {
                    paid = true
                };
                FirebaseResponse updateResponse = await client.UpdateAsync(buyerID, setFlag);

                FirebaseResponse getResponse = await client.GetAsync(buyerID);
                RegistrationUser hsResponse = getResponse.ResultAs<RegistrationUser>();

                MailMessage mail = new MailMessage("ben@yugen.gg", hsResponse.basicInfo.email);

                SmtpClient mailClient = new SmtpClient("smtp.gmail.com", 587);
                mailClient.UseDefaultCredentials = false;
                mailClient.Credentials = new NetworkCredential("ben@yugen.gg", "yugensupport");
                mailClient.EnableSsl = true;

                mail.Subject = "Yugen Registration Confirmation";
                mail.IsBodyHtml = true;
                mail.Body = "<p>Hello!</p><p>Your registration is complete and your payment has been received! Please check your inbox for the confirmation email from PayPal. We're looking forward to seeing you there!</p><p>If you have any questions, please feel free to reach out by responding to this email.</p><br /><span>Ben Ng</span><span>Yugen Raid Boss</span>";

                mailClient.Send(mail);
            }
            else
            {
                //The response is a failure. Something went wrong
                //Someday when I'm a responsible developer, I'll put up some error handling here.
            }
            return View("PaymentConfirmation");
        }

        public class RegistrationUser
        {
            public basicInfo basicInfo { get; set; }
            public string game { get; set; }
            public string id { get; set; }
            public bool paid { get; set; }
        }

        public class basicInfo
        {
            public string battleId { get; set; }
            public string email { get; set; }
            public string firstName { get; set; }
            public string lastName { get; set; }
            public string phone { get; set; }
        }

        public class paidFlag
        {
            public bool paid { get; set; }
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