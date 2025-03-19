"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AnimatedText } from "@/components/animated-text"
import { MapPin, Mail, Phone, Send } from "lucide-react"
import { submitServiceRequest } from "@/lib/actions"
import { Confetti } from "@/components/confetti"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  company: z.string().optional(),
  wasteType: z.string().min(1, { message: "Please select a waste type." }),
  quantity: z.string().min(1, { message: "Please enter an estimated quantity." }),
  address: z.string().min(5, { message: "Please enter your address." }),
  message: z.string().optional(),
})

export default function RequestPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      wasteType: "",
      quantity: "",
      address: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      await submitServiceRequest(values)
      setIsSuccess(true)
      form.reset()
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-900/30 py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <AnimatedText
          text="Request Pyrolysis Analysis Service"
          className="text-3xl sm:text-4xl font-bold text-center text-white mb-8"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="bg-black/50 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Service Request Form</CardTitle>
                <CardDescription>
                  Fill out the form below to request a pyrolysis suitability analysis for your waste materials.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isSuccess ? (
                  <div className="text-center py-12">
                    <Confetti />
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 text-green-500 mb-4">
                      <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
                    <p className="text-gray-300 mb-6">
                      Your service request has been submitted successfully. Our team will contact you shortly.
                    </p>
                    <Button
                      onClick={() => setIsSuccess(false)}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      Submit Another Request
                    </Button>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-200">Full Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="John Doe"
                                  {...field}
                                  className="bg-gray-900/50 border-gray-700 text-white"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-200">Email</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="john@example.com"
                                  {...field}
                                  className="bg-gray-900/50 border-gray-700 text-white"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-200">Phone Number</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="+1 (555) 123-4567"
                                  {...field}
                                  className="bg-gray-900/50 border-gray-700 text-white"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-200">Company (Optional)</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Your Company"
                                  {...field}
                                  className="bg-gray-900/50 border-gray-700 text-white"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="wasteType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-200">Waste Type</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="bg-gray-900/50 border-gray-700 text-white">
                                    <SelectValue placeholder="Select waste type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-gray-900 border-gray-700">
                                  <SelectItem value="plastic">Plastic Waste</SelectItem>
                                  <SelectItem value="rubber">Rubber Waste</SelectItem>
                                  <SelectItem value="biomass">Biomass</SelectItem>
                                  <SelectItem value="mixed">Mixed Waste</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="quantity"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-200">Estimated Quantity (tons/month)</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g., 10"
                                  {...field}
                                  className="bg-gray-900/50 border-gray-700 text-white"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-200">Address</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Your full address"
                                {...field}
                                className="bg-gray-900/50 border-gray-700 text-white"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-200">Additional Information (Optional)</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Any specific requirements or questions..."
                                {...field}
                                className="bg-gray-900/50 border-gray-700 text-white"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 rounded-lg transition-all duration-300 hover:shadow-glow"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center">
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Submitting...
                          </div>
                        ) : (
                          <div className="flex items-center justify-center">
                            <Send className="mr-2 h-5 w-5" />
                            Submit Request
                          </div>
                        )}
                      </Button>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="bg-black/50 backdrop-blur-sm border-gray-800 h-full">
              <CardHeader>
                <CardTitle className="text-white">Contact Information</CardTitle>
                <CardDescription>Reach out to us directly or submit the form.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/20 text-blue-500 mr-4">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Address</h4>
                      <p className="text-gray-400 mt-1">
                        Kandlakoya 500005
                        <br />
                        Hyderabad, Telangana.
                        <br />
                        India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-purple-500/20 text-purple-500 mr-4">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Email</h4>
                      <p className="text-gray-400 mt-1">
                        info@pyrolysisanalyzer.com
                        <br />
                        support@pyrolysisanalyzer.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-green-500/20 text-green-500 mr-4">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Phone</h4>
                      <p className="text-gray-400 mt-1">
                        +91 9121700886
                        <br />
                        +91 9121700886
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-gray-800">
                    <h4 className="text-white font-medium mb-4">Our Service Areas</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {["North America", "Europe", "Asia", "Australia", "South America", "Africa"].map((region) => (
                        <div key={region} className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                          <span className="text-gray-400 text-sm">{region}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

