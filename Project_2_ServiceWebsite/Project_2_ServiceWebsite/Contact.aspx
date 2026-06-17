<%@ Page Title="Contact" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Contact.aspx.cs" Inherits="Project_2_ServiceWebsite.Contact" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">

    <section class="section">
        <div class="container">
            <h2 class="section-title">Contact & Service Request</h2>

            <div class="contact-layout">

                <div class="contact-info-box">
                    <h3>Company Information</h3>
                    <p><span class="info-label">Company Name:</span> EasyService</p>
                    <p><span class="info-label">Email:</span> info@easyservice.com</p>
                    <p><span class="info-label">Phone:</span> +1 202 555 0148</p>
                    <p><span class="info-label">Address:</span> 245 Green Avenue, New York, USA</p>
                    <p><span class="info-label">Working Hours:</span> Monday - Saturday / 08:00 - 19:00</p>
                    <p><span class="info-label">Support:</span> Fast response and customer-focused service</p>
                    <p><span class="info-label">Estimated Response Time:</span> Within 2 Hours</p>
                </div>

                <div class="contact-box">
                    <h3>Request a Service</h3>

                    <div class="form-group">
                        <asp:TextBox ID="txtName" runat="server" placeholder="Your Full Name"></asp:TextBox>
                    </div>

                    <div class="form-group">
                        <asp:TextBox ID="txtEmail" runat="server" TextMode="Email" placeholder="Your Email"></asp:TextBox>
                    </div>

                    <div class="form-group">
                        <asp:TextBox ID="txtPhone" runat="server" placeholder="Your Phone Number"></asp:TextBox>
                    </div>

                    <div class="form-group">
                        <asp:DropDownList ID="ddlService" runat="server" AutoPostBack="true" OnSelectedIndexChanged="ddlService_SelectedIndexChanged">
                            <asp:ListItem Text="Select a Service" Value=""></asp:ListItem>
                            <asp:ListItem Text="Plumbing" Value="Plumbing"></asp:ListItem>
                            <asp:ListItem Text="Electrical" Value="Electrical"></asp:ListItem>
                            <asp:ListItem Text="Cleaning" Value="Cleaning"></asp:ListItem>
                            <asp:ListItem Text="Painting" Value="Painting"></asp:ListItem>
                            <asp:ListItem Text="AC Service" Value="AC Service"></asp:ListItem>
                            <asp:ListItem Text="Furniture Assembly" Value="Furniture Assembly"></asp:ListItem>
                        </asp:DropDownList>
                    </div>

                    <div class="form-group">
                        <asp:TextBox ID="txtPreferredDate" runat="server" TextMode="Date"></asp:TextBox>
                    </div>

                    <div class="form-group">
                        <asp:TextBox ID="txtMessage" runat="server" TextMode="MultiLine" Rows="6" placeholder="Write your service request"></asp:TextBox>
                    </div>

                    <div class="estimate-box">
                        <strong>Estimated Price:</strong>
                        <asp:Label ID="lblEstimatedPrice" runat="server" Text="$0"></asp:Label>
                    </div>

                    <br />

                    <asp:Button ID="btnSubmit" runat="server" Text="Send Request" CssClass="submit-btn" OnClick="btnSubmit_Click" />

                    <br /><br />
                    <asp:Label ID="lblResult" runat="server"></asp:Label>
                </div>

            </div>

            <section class="section">
                <h2 class="section-title">Previous Reservations</h2>
                <asp:Literal ID="litReservations" runat="server"></asp:Literal>
            </section>
        </div>
    </section>

</asp:Content>