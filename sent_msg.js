$(document).ready(function () {
    // Handle the click event on the "Send Message" button
    $("#sendMessage").click(function () {
        // Get form data
        var formData = {
            name: $("#yourname").val(),
            email: $("#exampleFormControlInput1").val(),
            message: $("#exampleFormControlTextarea1").val(),
            _autoresponse: "Hey, Thank you for messaging me. I will reply as soon as possible",
            _next: "https://millatsakib.github.io",
            _cc: "millatsakib7@gmail.com,millatsakib03@gmail.com",
            _captcha: "false",
            _subject: "New message sent from your portfolio",
            _template: "table"
        };

        // Send the AJAX request
        $.ajax({
            type: "POST",
            url: "https://formsubmit.co/millatsakib01@gmail.com",
            data: formData,
            success: function (response) {
                // Handle the success response (if needed)
                console.log("Message sent successfully:", response);

                // You can also update your UI or perform other actions here
            },
            error: function (xhr, status, error) {
                // Handle any errors that occur during the AJAX request
                console.error("Error sending message:", error);
            }
        });
    });
});
