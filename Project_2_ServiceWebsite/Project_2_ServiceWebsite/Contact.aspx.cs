using System;
using System.Collections.Generic;
using System.Text;

namespace Project_2_ServiceWebsite
{
    public partial class Contact : System.Web.UI.Page
    {
        public class Reservation
        {
            public string Name { get; set; }
            public string Email { get; set; }
            public string Phone { get; set; }
            public string Service { get; set; }
            public string PreferredDate { get; set; }
            public string Message { get; set; }
            public string EstimatedPrice { get; set; }
            public string Date { get; set; }
        }

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string selectedService = Request.QueryString["service"];
                string cancelIndex = Request.QueryString["cancel"];

                if (!string.IsNullOrEmpty(cancelIndex))
                {
                    DeleteReservation(cancelIndex);
                }

                if (!string.IsNullOrEmpty(selectedService))
                {
                    ddlService.SelectedValue = selectedService;
                    lblEstimatedPrice.Text = GetServicePrice(selectedService);
                }
                else
                {
                    lblEstimatedPrice.Text = "$0";
                }

                ShowReservations();
            }
        }

        protected void ddlService_SelectedIndexChanged(object sender, EventArgs e)
        {
            lblEstimatedPrice.Text = GetServicePrice(ddlService.SelectedValue);
        }

        protected void btnSubmit_Click(object sender, EventArgs e)
        {
            if (txtName.Text.Trim() == "" ||
                txtEmail.Text.Trim() == "" ||
                txtPhone.Text.Trim() == "" ||
                ddlService.SelectedValue == "" ||
                txtPreferredDate.Text.Trim() == "" ||
                txtMessage.Text.Trim() == "")
            {
                lblResult.Text = "Please fill in all fields.";
                lblResult.CssClass = "result-error";
                ShowReservations();
                return;
            }

            lblResult.Text = "Your service request has been sent successfully.";
            lblResult.CssClass = "result-success";

            List<Reservation> reservations;

            if (Session["Reservations"] == null)
            {
                reservations = new List<Reservation>();
            }
            else
            {
                reservations = (List<Reservation>)Session["Reservations"];
            }

            reservations.Add(new Reservation
            {
                Name = txtName.Text.Trim(),
                Email = txtEmail.Text.Trim(),
                Phone = txtPhone.Text.Trim(),
                Service = ddlService.SelectedValue,
                PreferredDate = txtPreferredDate.Text.Trim(),
                Message = txtMessage.Text.Trim(),
                EstimatedPrice = GetServicePrice(ddlService.SelectedValue),
                Date = DateTime.Now.ToString("dd.MM.yyyy HH:mm")
            });

            Session["Reservations"] = reservations;

            txtName.Text = "";
            txtEmail.Text = "";
            txtPhone.Text = "";
            ddlService.SelectedIndex = 0;
            txtPreferredDate.Text = "";
            txtMessage.Text = "";
            lblEstimatedPrice.Text = "$0";

            ShowReservations();
        }

        private string GetServicePrice(string serviceName)
        {
            switch (serviceName)
            {
                case "Plumbing":
                    return "$80";
                case "Electrical":
                    return "$95";
                case "Cleaning":
                    return "$60";
                case "Painting":
                    return "$140";
                case "AC Service":
                    return "$120";
                case "Furniture Assembly":
                    return "$70";
                default:
                    return "$0";
            }
        }

        private void DeleteReservation(string cancelIndex)
        {
            var reservations = Session["Reservations"] as List<Reservation>;

            if (reservations == null || reservations.Count == 0)
                return;

            int index;
            if (int.TryParse(cancelIndex, out index))
            {
                if (index >= 0 && index < reservations.Count)
                {
                    reservations.RemoveAt(index);
                    Session["Reservations"] = reservations;
                    lblResult.Text = "Reservation canceled successfully.";
                    lblResult.CssClass = "result-success";
                }
            }
        }

        private void ShowReservations()
        {
            var reservations = Session["Reservations"] as List<Reservation>;

            if (reservations == null || reservations.Count == 0)
            {
                litReservations.Text = "<p class='no-reservation'>No reservations yet.</p>";
                return;
            }

            StringBuilder html = new StringBuilder();
            html.Append("<div class='reservation-list'>");

            for (int i = reservations.Count - 1; i >= 0; i--)
            {
                html.Append("<div class='reservation-card'>");
                html.Append("<h3>" + reservations[i].Service + "</h3>");
                html.Append("<p><strong>Name:</strong> " + reservations[i].Name + "</p>");
                html.Append("<p><strong>Email:</strong> " + reservations[i].Email + "</p>");
                html.Append("<p><strong>Phone:</strong> " + reservations[i].Phone + "</p>");
                html.Append("<p><strong>Preferred Date:</strong> " + reservations[i].PreferredDate + "</p>");
                html.Append("<p><strong>Estimated Price:</strong> " + reservations[i].EstimatedPrice + "</p>");
                html.Append("<p><strong>Request:</strong> " + reservations[i].Message + "</p>");
                html.Append("<p><strong>Created At:</strong> " + reservations[i].Date + "</p>");
                html.Append("<a class='cancel-btn' href='Contact.aspx?cancel=" + i + "'>Cancel Reservation</a>");
                html.Append("</div>");
            }

            html.Append("</div>");
            litReservations.Text = html.ToString();
        }
    }
}