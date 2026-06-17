<%@ Page Title="Home" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="Project_2_ServiceWebsite._Default" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">

    <section class="hero">
        <div class="hero-content">
            <h1>Easy Home Services</h1>
            <p>We provide fast, affordable, and reliable services for your home and office.</p>
            <a href="Services.aspx" class="btn">Explore Services</a>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <h2 class="section-title">Featured Services</h2>

            <div class="card-wrapper">

                <div class="service-card">
                    <img src="Images/plumbing-new.jpg" alt="Plumbing Service" />
                    <div class="service-card-content">
                        <h3>Plumbing</h3>
                        <p>Fix leaking pipes, kitchen faucets, and bathroom water problems quickly.</p>
                        <div class="service-meta">
                            <p><strong>Duration:</strong> 1 - 2 Days</p>
                            <p><strong>Availability:</strong> Monday - Saturday</p>
                        </div>
                        <p class="price">$80</p>
                        <a href="Contact.aspx?service=Plumbing" class="btn">Book Service</a>
                    </div>
                </div>

                <div class="service-card">
                    <img src="Images/cleaning-new.jpg" alt="Cleaning Service" />
                    <div class="service-card-content">
                        <h3>Cleaning</h3>
                        <p>Professional home and apartment cleaning with trusted staff.</p>
                        <div class="service-meta">
                            <p><strong>Duration:</strong> 1 Day</p>
                            <p><strong>Availability:</strong> Every Day</p>
                        </div>
                        <p class="price">$60</p>
                        <a href="Contact.aspx?service=Cleaning" class="btn">Book Service</a>
                    </div>
                </div>

                <div class="service-card">
                    <img src="Images/electrical-new.jpg" alt="Electrical Service" />
                    <div class="service-card-content">
                        <h3>Electrical</h3>
                        <p>Safe electrical repair, socket installation, and lighting support.</p>
                        <div class="service-meta">
                            <p><strong>Duration:</strong> 1 - 3 Days</p>
                            <p><strong>Availability:</strong> Monday - Friday</p>
                        </div>
                        <p class="price">$95</p>
                        <a href="Contact.aspx?service=Electrical" class="btn">Book Service</a>
                    </div>
                </div>

            </div>
        </div>
    </section>

</asp:Content>