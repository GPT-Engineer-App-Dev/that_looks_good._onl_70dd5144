import React, { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Input, VStack, Text, useToast, Heading } from "@chakra-ui/react";
import { FaPrint } from "react-icons/fa";

const Index = () => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    email: "",
    sampleInfo: "",
    contactInfo: "",
    returnInfo: "",
    materialType: "",
    materialSpecs: "",
    desiredSize: "",
    sampleLocation: "",
    logoFile: null,
  });
  const [uniqueNumber, setUniqueNumber] = useState(null);
  const [trackingNumber, setTrackingNumber] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const generateUniqueNumber = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  const generateTrackingNumber = () => {
    return "CYK" + Date.now().toString().slice(-8);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const uniqueNum = generateUniqueNumber();
    const trackNum = generateTrackingNumber();
    setUniqueNumber(uniqueNum);
    setTrackingNumber(trackNum);

    // TODO: Email automation to send form data, unique number, and tracking number
    toast({
      title: "Form Submitted.",
      description: `Your unique number is ${uniqueNum} and your tracking number is ${trackNum}.`,
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  const printLabel = () => {
    // TODO: Implement label printing functionality
    alert(`Print Shipping Label:\nCyklop CSC Att.: SampleLab M.Slot [${uniqueNumber}] Wilhelm Röntgenstraat 10, 8013NC, Zwolle, Nederland\nTracking Number: ${trackingNumber}`);
  };

  return (
    <Box bg="#002F5D" minH="100vh" py={10}>
      <Container maxW="container.md">
        <VStack spacing={5}>
          <Heading as="h1" size="xl" color="white">
            Shipment Tracking and Sample Request
          </Heading>
          <FormControl id="email" isRequired>
            <FormLabel color="white">Email Address</FormLabel>
            <Input name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="Enter your email" color="white" />
          </FormControl>
          <FormControl id="contactInfo" isRequired>
            <FormLabel color="white">Contact Information</FormLabel>
            <Input name="contactInfo" value={formData.contactInfo} onChange={handleInputChange} placeholder="Enter your contact information" color="white" />
          </FormControl>
          <FormControl id="returnInfo">
            <FormLabel color="white">Return Sample Information</FormLabel>
            <Input name="returnInfo" value={formData.returnInfo} onChange={handleInputChange} placeholder="Enter return sample information" color="white" />
          </FormControl>
          <FormControl id="materialType" isRequired>
            <FormLabel color="white">Material Type</FormLabel>
            <Input name="materialType" value={formData.materialType} onChange={handleInputChange} placeholder="Enter the type of material" color="white" />
          </FormControl>
          <FormControl id="materialSpecs">
            <FormLabel color="white">Material Specs</FormLabel>
            <Input name="materialSpecs" value={formData.materialSpecs} onChange={handleInputChange} placeholder="Enter the specifications of material" color="white" />
          </FormControl>
          <FormControl id="desiredSize">
            <FormLabel color="white">Desired Sample Size</FormLabel>
            <Input name="desiredSize" value={formData.desiredSize} onChange={handleInputChange} placeholder="Enter the desired sample size" color="white" />
          </FormControl>
          <FormControl id="sampleLocation">
            <FormLabel color="white">Sample Location</FormLabel>
            <Input name="sampleLocation" value={formData.sampleLocation} onChange={handleInputChange} placeholder="Enter possible sample locations" color="white" />
          </FormControl>
          <FormControl id="logoFile">
            <FormLabel color="white">Upload Logo or Design</FormLabel>
            <Input name="logoFile" type="file" onChange={handleInputChange} placeholder="Upload your logo or design" color="white" accept=".svg,.pdf,.png,.bmp,.jpg,.jpeg,.ai,.plt" />
          </FormControl>
          <Button colorScheme="green" bg="#6CB42C" color="white" leftIcon={<FaPrint />} onClick={handleSubmit} isDisabled={trackingNumber != null}>
            Submit Request
          </Button>
          {trackingNumber && (
            <Button colorScheme="green" bg="#6CB42C" color="white" leftIcon={<FaPrint />} onClick={printLabel}>
              Print Shipping Label
            </Button>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default Index;
