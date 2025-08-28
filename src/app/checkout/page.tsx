'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 10 }, (_, i) => (currentYear + i).toString());

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  city: z.string().min(2, { message: "City must be at least 2 characters." }),
  zip: z.string().min(5, { message: "Zip code must be at least 5 characters." }),
  paymentMethod: z.enum(['card', 'paypal', 'gpay'], {
    required_error: "You need to select a payment method.",
  }),
  card: z.string().length(16, { message: "Card number must be 16 digits." }),
  expiryMonth: z.string({ required_error: "Please select an expiry month." }),
  expiryYear: z.string({ required_error: "Please select an expiry year." }),
  cvc: z.string().length(3, { message: "CVC must be 3 digits." }),
});

const SHIPPING_COST = 10;
const FREE_SHIPPING_THRESHOLD = 100;

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      city: "",
      zip: "",
      card: "",
      cvc: "",
    },
  });

  const paymentMethod = form.watch('paymentMethod');

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Order Placed!",
      description: "Thank you for your purchase. Your order is being processed.",
    });
    clearCart();
    router.push('/');
  }

  if (cartItems.length === 0) {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-10 text-center">
            <h1 className="text-3xl font-bold mt-4">Your cart is empty.</h1>
            <p className="text-muted-foreground mt-2">Please add items to your cart before proceeding to checkout.</p>
            <Button asChild className="mt-6">
                <a href="/">Return to Shop</a>
            </Button>
        </div>
    );
  }

  const shippingCost = cartTotal > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const finalTotal = cartTotal + shippingCost;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Shipping & Payment Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="name" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl><Input placeholder="john.doe@example.com" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                  <FormField control={form.control} name="address" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl><Input placeholder="123 Evergreen Lane" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <div className="grid md:grid-cols-2 gap-6">
                     <FormField control={form.control} name="city" render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl><Input placeholder="Greenville" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                     <FormField control={form.control} name="zip" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Zip Code</FormLabel>
                        <FormControl><Input placeholder="12345" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Payment Method</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl><RadioGroupItem value="card" /></FormControl>
                              <FormLabel className="font-normal">Credit Card</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl><RadioGroupItem value="paypal" /></FormControl>
                              <FormLabel className="font-normal">PayPal</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl><RadioGroupItem value="gpay" /></FormControl>
                              <FormLabel className="font-normal">Google Pay</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {paymentMethod === 'card' && (
                    <div className="space-y-8">
                       <FormField control={form.control} name="card" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Card Number</FormLabel>
                          <FormControl><Input placeholder="•••• •••• •••• ••••" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <div className="grid md:grid-cols-3 gap-6">
                        <FormField
                          control={form.control}
                          name="expiryMonth"
                          render={({ field }) => (
                            <FormItem className="md:col-span-1">
                              <FormLabel>Expiry Month</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Month" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {Array.from({length: 12}, (_, i) => (
                                      <SelectItem key={i+1} value={(i+1).toString().padStart(2, '0')}>
                                          {(i+1).toString().padStart(2, '0')}
                                      </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                         <FormField
                          control={form.control}
                          name="expiryYear"
                          render={({ field }) => (
                            <FormItem className="md:col-span-1">
                              <FormLabel>Expiry Year</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Year" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {years.map(year => (
                                        <SelectItem key={year} value={year}>{year}</SelectItem>
                                    ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField control={form.control} name="cvc" render={({ field }) => (
                          <FormItem className="md:col-span-1">
                            <FormLabel>CVC</FormLabel>
                            <FormControl><Input placeholder="123" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>
                    </div>
                  )}

                  <Button type="submit" className="w-full" size="lg">Place Order</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Your Order</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t my-4" />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shippingCost > 0 ? `$${shippingCost.toFixed(2)}` : 'Free'}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
