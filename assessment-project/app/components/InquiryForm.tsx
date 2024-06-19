// InquiryForm.tsx

import React, { useState, ChangeEvent, FormEvent } from 'react';

export interface FormData {
  name: string;
  email: string;
  zipCode: string;
  staffingType: string[];
}

interface InquiryFormProps {
  onSubmit: (data: FormData) => void;
}

const InquiryForm: React.FC<InquiryFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    zipCode: '',
    staffingType: [],
  });

  const staffingOptions = ['Assisted Living', 'Home Care', 'Home Health', 'Independent Living/Retirement Community'];

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      if (checked) {
        return { ...prevData, staffingType: [...prevData.staffingType, value] };
      } else {
        return { ...prevData, staffingType: prevData.staffingType.filter((type) => type !== value) };
      }
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className='container'>
        <label className="flex flex-row text-sm font-medium text-[#993B00]">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="flex mt-1 text-black w-full rounded-md border-gray-300 shadow-sm focus:border-[#F0FEFF] focus:ring-[#F0FEFF] sm:text-sm"
          required
        />
      </div>
      <div>
        <label className="flex flex-row text-sm font-medium text-[#993B00]">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="flex mt-1 text-black w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label className="flex flex-row text-sm font-medium text-[#993B00]">Zip Code</label>
        <input
          type="text"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          className="flex mt-1 text-black w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label className="flex text-sm font-medium text-[#993B00]">Type of Medical Staffing</label>
        <div className="mt-2 space-y-2">
          {staffingOptions.map((option) => (
            <div key={option} className="flex items-center">
              <input
                type="checkbox"
                name="staffingType"
                value={option}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label className="ml-2 block text-sm text-[#027073]">{option}</label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-[#027073] shadow-sm text-sm font-medium rounded-md text-[#027073] bg-[#F0FEFF] hover:bg-[#F0FEFF]"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default InquiryForm;
