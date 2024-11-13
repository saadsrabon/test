'use client';

import React, { useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Preview from './Preview';
import { useGetuserTypesQuery } from '@/store/usertypes/usertypes';

const PostYourActivity = () => {
  const [step, setStep] = useState(0);
  const [activityData, setActivityData] = useState({
    host: "",
    images: [],
    videos: [],
    title: "",
    for: [],
    date: "",
    time: "",
    activityType: "",
    duration: "",
    ageGroup: "",
    totalPeopleCanJoin: 0,
    totalWomansCanJoin: 0,
    totalMensCanJoin: 0,
    petsWelcome: 0,
    whatsIncluded: "",
    about: "",
    strategy: "",
    bookingClosingTime: "",
    country: "",
    department: "",
    city: "",
    mapLink: "",
    fullAddress: "",
    fullAddress2: "",
    noteAboutLocation: "",
    attendeesBring: "",
    rules: "",
    whoCantAttend: "",
    minPeople: 0,
    pricesPlan: [],
    // bookingCancelationTime: "",
    profileCompleteRequired: false,
    attendeesList: [],
    status: "open",
    cancellingReason: "",
    avgRating: 0,
    ratings: [],
    futureDates: []
  });

  const { data: targetAudience = [], isLoading, isError } = useGetuserTypesQuery();


  const stepComps = [

    <Step1 key="step1" idx="step1" setStep={setStep} num={1} activityData={activityData} setActivityData={setActivityData} />,
    <Step2 key="step2" idx="step2" setStep={setStep} num={2} activityData={activityData} setActivityData={setActivityData} />,
    <Step3 key="step2" idx="step3" setStep={setStep} num={3} activityData={activityData} setActivityData={setActivityData} />,
    <Step4 key="step2" idx="step4" setStep={setStep} num={4} activityData={activityData} setActivityData={setActivityData} targetAudience={targetAudience?.data} />,
    <Step5 key="step5" idx="step5" setStep={setStep} num={5} activityData={activityData} setActivityData={setActivityData} />,
    <Preview key="step6" idx="step6" setStep={setStep} num={6} activityData={activityData} setActivityData={setActivityData} />,
  ];
  return (
    <div className="w-full">
      {stepComps?.map((stepComp, index) => (
        <div key={index}>{index === step ? stepComp : null}</div>
      ))}
    </div>
  );
};

export default PostYourActivity;


const data = {
  "host": "66a5e89736568bfd08639149",
  "images": [],
  "videos": [],
  "title": "Sheikh hasina mara andolon",
  "for": [
    "Men",
    "Women",
    "Children",
    "Elderly"
  ],
  "date": "2024-07-20",
  "time": "10:00 AM",
  "activityType": "Indoor",
  "duration": "3 hours",
  "ageGroup": "20-30",
  "totalPeopleCanJoin": 50,
  "totalWomansCanJoin": 25,
  "totalMensCanJoin": 25,
  "petsWelcome": true,
  "whatsIncluded": "gloves, trashbags",
  "about": "Join us for a community cleanup event to help keep our neighborhood clean.",
  "strategy": "Volunteers will be divided into groups to cover different areas.",
  "bookingClosingTime": "2024-07-19T18:00:00Z",
  "country": "USA",
  "department": "Sanitation",
  "city": "San Francisco",
  "mapLink": "https://maps.app.goo.gl/pq5JFA2Wubgr1gpM9",
  "fullAddress": "123 Main St, San Francisco, CA",
  "fullAddress2": "Suite 100",
  "noteAboutLocation": "Meet at the community center.",
  "attendeesBring": "Reusable water bottle, sunscreen, hat",
  "rules": "No littering, follow group leaders' instructions",
  "whoCantAttend": "Children",
  "minPeople": 30,
  "pricesPlan": [
    {
      "pricing_category": "adult",
      "price": 50,
      "total": 10,
      "available": 5,
      "currency": "usd"
    },
    {
      "pricing_category": "child",
      "price": 40,
      "total": 20,
      "available": 10,
      "currency": "usd"
    }
  ],
  "bookingCancelationPolicy": {
    "time": "anytime", // never, 2 hours, 3 hours, 6 hours
    "refund": 20
  },
  "attendeesList": [],
  "status": "open",
  "cancellingReason": "",
  "avgRating": 4.5,
  "ratings": [],
  "futureDates": []
}