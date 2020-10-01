using System;
using System.Collections.Generic;
using System.Text;

namespace Pheesible.Promotions.DTO
{
    public class StripeWebhookDto
    {
        public int created { get; set; }
        public bool livemode { get; set; }
        public string id { get; set; }
        public string type { get; set; }
        public string _object { get; set; }
        public object request { get; set; }
        public int pending_webhooks { get; set; }
        public string api_version { get; set; }
        public Data data { get; set; }
    }

    public class Data
    {
        public Object _object { get; set; }
    }

    public class Object
    {
        public string id { get; set; }
        public string _object { get; set; }
        public int amount { get; set; }
        public int amount_captured { get; set; }
        public int amount_refunded { get; set; }
        public object application { get; set; }
        public object application_fee { get; set; }
        public object application_fee_amount { get; set; }
        public string balance_transaction { get; set; }
        public Billing_Details billing_details { get; set; }
        public string calculated_statement_descriptor { get; set; }
        public bool captured { get; set; }
        public int created { get; set; }
        public string currency { get; set; }
        public object customer { get; set; }
        public object description { get; set; }
        public bool disputed { get; set; }
        public object failure_code { get; set; }
        public object failure_message { get; set; }
        public Fraud_Details fraud_details { get; set; }
        public object invoice { get; set; }
        public bool livemode { get; set; }
        public Metadata metadata { get; set; }
        public object on_behalf_of { get; set; }
        public object order { get; set; }
        public Outcome outcome { get; set; }
        public bool paid { get; set; }
        public string payment_intent { get; set; }
        public string payment_method { get; set; }
        public Payment_Method_Details payment_method_details { get; set; }
        public object receipt_email { get; set; }
        public object receipt_number { get; set; }
        public string receipt_url { get; set; }
        public bool refunded { get; set; }
        public Refunds refunds { get; set; }
        public object review { get; set; }
        public object shipping { get; set; }
        public object source_transfer { get; set; }
        public object statement_descriptor { get; set; }
        public object statement_descriptor_suffix { get; set; }
        public string status { get; set; }
        public object transfer_data { get; set; }
        public object transfer_group { get; set; }
    }

    public class Billing_Details
    {
        public Address address { get; set; }
        public object email { get; set; }
        public string name { get; set; }
        public object phone { get; set; }
    }

    public class Address
    {
        public object city { get; set; }
        public object country { get; set; }
        public object line1 { get; set; }
        public object line2 { get; set; }
        public string postal_code { get; set; }
        public object state { get; set; }
    }

    public class Fraud_Details
    {
    }

    public class Metadata
    {
        public string integration_check { get; set; }
    }

    public class Outcome
    {
        public string network_status { get; set; }
        public object reason { get; set; }
        public string risk_level { get; set; }
        public int risk_score { get; set; }
        public string seller_message { get; set; }
        public string type { get; set; }
    }

    public class Payment_Method_Details
    {
        public Card card { get; set; }
        public string type { get; set; }
    }

    public class Card
    {
        public string brand { get; set; }
        public Checks checks { get; set; }
        public string country { get; set; }
        public int exp_month { get; set; }
        public int exp_year { get; set; }
        public string fingerprint { get; set; }
        public string funding { get; set; }
        public object installments { get; set; }
        public string last4 { get; set; }
        public string network { get; set; }
        public object three_d_secure { get; set; }
        public object wallet { get; set; }
    }

    public class Checks
    {
        public object address_line1_check { get; set; }
        public string address_postal_code_check { get; set; }
        public string cvc_check { get; set; }
    }

    public class Refunds
    {
        public string _object { get; set; }
        public object[] data { get; set; }
        public bool has_more { get; set; }
        public string url { get; set; }
    }


}
