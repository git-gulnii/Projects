<%@ Page Title="Services" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Services.aspx.cs" Inherits="Project_2_ServiceWebsite.Services" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

    <section class="section">
        <div class="container">
            <h2 class="section-title">All Services</h2>

            <div class="card-wrapper">

                <div class="service-card">
                    <img src="Images/plumbing-new.jpg" alt="Plumbing" />
                    <div class="service-card-content">
                        <h3>Plumbing</h3>
                        <p>Leak fixing, pipe repair, faucet replacement, and bathroom maintenance.</p>
                        <div class="service-meta">
                            <p><strong>Duration:</strong> 1 - 2 Days</p>
                            <p><strong>Availability:</strong> Monday - Saturday</p>
                        </div>
                        <p class="price">$80</p>
                        <a href="Contact.aspx?service=Plumbing" class="btn">Book Service</a>
                    </div>
                </div>

                <div class="service-card">
                    <img src="Images/electrical-new.jpg" alt="Electrical" />
                    <div class="service-card-content">
                        <h3>Electrical</h3>
                        <p>Safe electrical installations, cable repair, and lighting system support.</p>
                        <div class="service-meta">
                            <p><strong>Duration:</strong> 1 - 3 Days</p>
                            <p><strong>Availability:</strong> Monday - Friday</p>
                        </div>
                        <p class="price">$95</p>
                        <a href="Contact.aspx?service=Electrical" class="btn">Book Service</a>
                    </div>
                </div>

                <div class="service-card">
                    <img src="Images/cleaning-new.jpg" alt="Cleaning" />
                    <div class="service-card-content">
                        <h3>Cleaning</h3>
                        <p>Deep home cleaning, office cleaning, and apartment cleaning services.</p>
                        <div class="service-meta">
                            <p><strong>Duration:</strong> 1 Day</p>
                            <p><strong>Availability:</strong> Every Day</p>
                        </div>
                        <p class="price">$60</p>
                        <a href="Contact.aspx?service=Cleaning" class="btn">Book Service</a>
                    </div>
                </div>

                <div class="service-card">
                    <img src="Images/painting-new.jpg" alt="Painting" />
                    <div class="service-card-content">
                        <h3>Painting</h3>
                        <p>Interior and exterior painting with clean and professional finishing.</p>
                        <div class="service-meta">
                            <p><strong>Duration:</strong> 2 - 4 Days</p>
                            <p><strong>Availability:</strong> Monday - Saturday</p>
                        </div>
                        <p class="price">$140</p>
                        <a href="Contact.aspx?service=Painting" class="btn">Book Service</a>
                    </div>
                </div>

                <div class="service-card">
                    <img src="Images/ac-service-new.jpg" alt="AC Service" />
                    <div class="service-card-content">
                        <h3>AC Service</h3>
                        <p>Air conditioner installation, maintenance, and repair for all seasons.</p>
                        <div class="service-meta">
                            <p><strong>Duration:</strong> 1 - 2 Days</p>
                            <p><strong>Availability:</strong> Monday - Friday</p>
                        </div>
                        <p class="price">$120</p>
                        <a href="Contact.aspx?service=AC Service" class="btn">Book Service</a>
                    </div>
                </div>

                <div class="service-card">
                    <img src="Images/furniture-new.jpg" alt="Furniture Assembly" />
                    <div class="service-card-content">
                        <h3>Furniture Assembly</h3>
                        <p>Fast and secure furniture installation for homes, offices, and new spaces.</p>
                        <div class="service-meta">
                            <p><strong>Duration:</strong> 1 Day</p>
                            <p><strong>Availability:</strong> Every Day</p>
                        </div>
                        <p class="price">$70</p>
                        <a href="Contact.aspx?service=Furniture Assembly" class="btn">Book Service</a>
                    </div>
                </div>

            </div>
        </div>
    </section>

</asp:Content>