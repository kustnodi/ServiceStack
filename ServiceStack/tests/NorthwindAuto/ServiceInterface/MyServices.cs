﻿using ServiceStack;
using MyApp.ServiceModel;

namespace MyApp.ServiceInterface;

public class MyServices : Service
{
    public static string AssertName(string Name) => Name.IsNullOrEmpty() 
        ? throw new ArgumentNullException(nameof(Name))
        : Name;

    public object Get(Greet request) =>
        new HelloResponse { Result = "Welcome!" };

    public object Get(Hello request) =>
        new HelloResponse { Result = $"Hello, {AssertName(request.Name)}!" };

    public object Any(HelloVeryLongOperationNameVersions request) =>
        new HelloResponse { Result = $"Hello, {AssertName(request.Name!)}!" };

    // public object Any(HelloVeryLongOperationNameVersionsAndThenSome request) =>
    //     new HelloResponse { Result = $"Hello, {AssertName(request.Name)}!" };

    public object Any(HelloSecure request) => 
        new HelloResponse { Result = $"Hello, {AssertName(request.Name)}!" };

    public object Any(HelloBookingList request) => new List<Booking>();
}
