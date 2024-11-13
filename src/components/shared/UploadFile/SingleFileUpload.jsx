import { cn } from '@/lib/utils';
import { useUploadFileMutation } from '@/store/services/fileUploadApi';
import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import { ImFilePicture } from 'react-icons/im';
import { IoCloseSharp } from 'react-icons/io5';
import { Bounce, toast } from 'react-toastify';

const SingleImageUpload = ({
    imageUrl, // To handle image preview
    setImageUrl, // Callback for setting the image URL
    setValue, // Function to set the form value
    label = "Profile Image", // Label for the upload section
    fieldName = 'image', // The form field name (default: 'image')
    acceptedFileTypes = "image/png, image/gif, image/jpeg", // Allowed file types
    maxFileSize = 2 * 1024 * 1024, // Maximum file size in bytes (default: 2MB)
    placeholderText = "Drop an image or click to browse", // Placeholder text
    descriptionText = "Ensure the image quality is high.", // Description below the uploader
    deleteText = "Remove Image", // Text for deleting the image
    toastOptions = { position: 'top-right', autoClose: 5000, theme: 'colored', transition: Bounce }, // Toast options
}) => {

    const [uploadFile] = useUploadFileMutation();

    const handleImageUpload = async (event) => {
        const file = event.target.files[0]; // Get the first (and only) file
        handleFile(file);
    };

    const handleFile = async (file) => {
        if (file) {
            // Check file size
            if (file.size > maxFileSize) {
                toast.error('File is too large. Please select a file smaller than 2MB.', toastOptions);
                return;
            }

            const formData = new FormData();
            formData.append('file', file);

            const { data, error } = await uploadFile(formData);

            if (!error) {
                setImageUrl(data?.data?.file_url);
                setValue(fieldName, data?.data?.file_url);
            } else {
                toast.error(error.data.message, toastOptions);
            }
        } else {
            toast.error('Please select a valid image.', toastOptions);
        }
    };

    const handleImageDelete = () => {
        setImageUrl(null); // Remove the image
        setValue(fieldName, null);
    };

    const handleDrop = useCallback((event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0]; // Get the first file dropped
        handleFile(file);
    }, []);

    const handleDragOver = (event) => {
        event.preventDefault(); // Prevent default to allow drop
    };

    return (
        <div className="mb-4 lg:w-1/2">
            <label className="block mb-3">{label}</label>
            <div
                className={cn("relative flex justify-between h-32 border border-dashed rounded-md", { "justify-center": !imageUrl })}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                <label htmlFor={fieldName} className={cn("flex items-center justify-center w-3/5 p-5 gap-3 cursor-pointer", { 'w-full': !imageUrl })}>
                    <ImFilePicture className="text-3xl text-muted-foreground" />
                    <div className="text-xs text-gray-400 md:text-base">
                        <p className="mb-3">{placeholderText}</p>
                        <p className="text-blue-500 underline">click to browse</p>
                    </div>
                </label>
                <input
                    id={fieldName}
                    name={fieldName}
                    type="file"
                    accept={acceptedFileTypes}
                    className="hidden"
                    onChange={handleImageUpload}
                />
                {imageUrl && (
                    <div className="relative">
                        <Image
                            width={150}
                            height={150}
                            src={imageUrl}
                            alt="Uploaded"
                            className="object-cover border rounded-md size-32"
                        />
                        <button
                            type="button"
                            onClick={handleImageDelete}
                            className="absolute top-0 right-0 text-xs text-white bg-red-500 rounded-full md:p-1 md:top-1 md:right-1 size-4 sm:size-auto"
                        >
                            <IoCloseSharp className="size-4" />
                        </button>
                    </div>
                )}
            </div>

            <p className="mt-3 text-xs text-gray-500">
                {descriptionText}
            </p>
        </div>
    );
};

export default SingleImageUpload;


// import { cn } from '@/lib/utils';
// import Image from 'next/image';
// import React from 'react';
// import { ImFilePicture } from 'react-icons/im';
// import { IoCloseSharp } from 'react-icons/io5';
// import { Bounce, toast } from 'react-toastify';

// const SingleImageUpload = ({ image, setImage }) => {
//     const handleImageUpload = async (event) => {
//         const file = event.target.files[0]; // Get the first (and only) file

//         if (file) {
//             setImage(file); // Set the single image
//         } else {
//             toast.error('Please select a valid image.', {
//                 position: 'top-right',
//                 autoClose: 5000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: 'colored',
//                 transition: Bounce,
//             });
//         }
//     };

//     const handleImageDelete = () => {
//         setImage(null); // Remove the image
//     };

//     return (
//         <div className="w-1/2 mb-4">
//             <label className="block mb-3">Product Image</label>
//             <div className={cn("relative flex justify-between h-32 border border-dashed rounded-md", { "justify-center": !image })}>
//                 <label htmlFor="imageUpload" className="flex items-center justify-center w-3/5 gap-3 cursor-pointer">
//                     <ImFilePicture className="text-3xl text-muted-foreground" />
//                     <div className="text-gray-400">
//                         <p className="mb-3">Drop an image or</p>
//                         <p className="text-blue-500 underline">click to browse</p>
//                     </div>
//                 </label>
//                 <input
//                     id="imageUpload"
//                     name="image"
//                     type="file"
//                     accept="image/png, image/gif, image/jpeg"
//                     className="hidden"
//                     onChange={handleImageUpload}
//                 />
//                 {/* Render selected image below the input */}
//                 {/* <div className="flex gap-4 p-1 mt-4 bg-slate-50"> */}
//                 {image &&
//                     <div className="relative">
//                         <Image
//                             width={150}
//                             height={150}
//                             src={URL.createObjectURL(image)}
//                             alt="Product"
//                             className="object-cover border rounded-md size-16 md:size-32"
//                         />
//                         <button
//                             type="button"
//                             onClick={handleImageDelete}
//                             className="absolute top-0 right-0 text-xs text-white bg-red-500 rounded-full md:p-1 md:top-1 md:right-1 size-4 sm:size-auto"
//                         >
//                             <IoCloseSharp className="size-4" />
//                         </button>
//                     </div>
//                 }
//                 {/* </div> */}
//             </div>


//             <p className="mt-3 text-xs text-gray-500">
//                 You need to add an image. Pay attention to the quality of the picture you add (important).
//             </p>
//         </div>
//     );
// };

// export default SingleImageUpload;
