import React, { useEffect, useState } from "react";
import {
  Box,
  VStack,
  Flex,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  Icon,
} from "@chakra-ui/react";
import { FiMenu, FiHome, FiUsers } from "react-icons/fi";
import { AiOutlineNotification } from "react-icons/ai";
import DashboardComponent from "./components/DashboardComponent";
import UserComponent from "./components/UserComponent";
import ComplainmentComponent from "./components/ComplainmentComponent";
import { BiCalendar } from "react-icons/bi";
import BookingComponent from "./components/BookingComponent";

const AdminDashboard: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [selectedComponent, setSelectedComponent] = useState<string>("dashboard");

  // Toggle the isMobile state based on the window width
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
    setIsDesktop(window.innerWidth > 768);
  };

  // Add event listener for window resize
  useEffect(() => {
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile || isDesktop) {
      onOpen();
    }
  };

  const handleComponentChange = (component: string) => {
    setSelectedComponent(component);
    onClose();
  };

  const renderSelectedComponent = () => {
    const tempUserData = localStorage.getItem("user");
    const userData = !tempUserData ? "" : JSON.parse(tempUserData);
    switch (selectedComponent) {
      case "dashboard":
        return <DashboardComponent />;
      case "users":
        return (
          <UserComponent
            id={userData.id}
            name={userData.name}
            email={userData.email}
            role={userData.role}
          />
        );
      case "pengaduan":
        return <ComplainmentComponent />;
      case "booking":
        return <BookingComponent />;
      default:
        return <DashboardComponent />;
    }
  };

  return (
    <Flex height="100%">
      {/* Toggle Button for Larger Screens */}
      {(isMobile || isDesktop) && (
        <IconButton
          aria-label="Toggle Sidebar"
          icon={<FiMenu />}
          onClick={toggleSidebar}
          position="fixed"
          top="4"
          left="4"
          zIndex="1"
        />
      )}

      {/* Sidebar */}
      <Drawer
        placement="left"
        onClose={onClose}
        isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>List Sidebar</DrawerHeader>
            <DrawerBody>
              <VStack
                spacing={4}
                align="start"
                width="100%"
                p={4}>
                {/* Navigation Links */}
                <VStack
                  align="start"
                  spacing={2}
                  width="100%">
                  <Box
                    fontSize="xl"
                    display="flex"
                    alignItems="center"
                    onClick={() => handleComponentChange("dashboard")}
                    cursor="pointer">
                    <Icon
                      as={FiHome}
                      fontSize="xl"
                      mr={2}
                    />
                    Dashboard
                  </Box>
                  <Box
                    fontSize="xl"
                    display="flex"
                    alignItems="center"
                    onClick={() => handleComponentChange("users")}
                    cursor="pointer">
                    <Icon
                      as={FiUsers}
                      fontSize="xl"
                      mr={2}
                    />
                    Users
                  </Box>
                  <Box
                    fontSize="xl"
                    display="flex"
                    alignItems="center"
                    onClick={() => handleComponentChange("pengaduan")}
                    cursor="pointer">
                    <Icon
                      as={AiOutlineNotification}
                      fontSize="xl"
                      mr={2}
                    />
                    Pengaduan
                  </Box>
                  <Box
                    fontSize="xl"
                    display="flex"
                    alignItems="center"
                    onClick={() => handleComponentChange("booking")}
                    cursor="pointer">
                    <Icon
                      as={BiCalendar}
                      fontSize="xl"
                      mr={2}
                    />
                    Booking
                  </Box>
                </VStack>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>

      {/* Main Content */}
      {renderSelectedComponent()}
    </Flex>
  );
};

export default AdminDashboard;
