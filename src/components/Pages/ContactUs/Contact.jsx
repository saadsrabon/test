'use client';

import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useSendEmailMutation } from '@/store/contact/contact';
import { useForm } from 'react-hook-form';

const Contact = () => {
  const { register, handleSubmit, reset } = useForm();
  const [sendEmail, { isLoading, data }] = useSendEmailMutation();
  const { toast } = useToast();
  const onSubmitContact = async (data) => {
    const value = {
      ...data,
    };
    const { data: ContactData, error } = await sendEmail(value);
    if (error) {
      console.log(error);

      toast({
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
      });

      return;
    }
    toast({
      title: 'Success',
      description: 'Completed sending the email',
    });
    reset()
    
  };

  return (
    <div className="max-w-[700px] mx-auto w-full lg:md:px-6 px-4 my-32">
      <div className="space-y-10">
        <div className="space-y-3">
          <h1 className="font-semibold text-xl">Contact Us</h1>
          <p className="text-xs md:text-sm ">
            This will help us quickly identify you and get you the right kind of
            help
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmitContact)} className="space-y-5">
          <div className="flex flex-col md:flex-row justify-center items-center gap-5">
            <Input
              {...register('name')}
              className="border border-gray-300"
              placeholder="Enter your name"
            />
            <Input
              {...register('email')}
              className="border border-gray-300"
              placeholder="Enter your email"
            />
          </div>
          <Input
            {...register('subject')}
            className="border border-gray-300"
            placeholder="Subject"
          />
          <div className="group col-span-2 rounded-lg">
            <textarea
              {...register('message')}
              placeholder="Write your message"
              cols="20"
              rows="5"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm duration-300 focus:outline-none"
            ></textarea>
          </div>
          <button className="bg-primary text-white px-8 py-2 text-sm rounded-sm">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
