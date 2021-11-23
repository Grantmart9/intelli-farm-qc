/**
 * @description      :
 * @author           : Grant
 * @group            :
 * @created          : 11/08/2021 - 08:12:28
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 11/08/2021
 * - Author          : Grant
 * - Modification    :
 **/
import React, { useState, useContext, createContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import leaf from "images/leaf.png";
import { Nav, Image, Button, Accordion } from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";
import { useMd } from "media-query";

export const SidebarContext = createContext();

const NavItem = ({ title, link, external, target, image }) => {
  const { pathname } = useLocation();
  const navItemClassName = link === pathname ? "active" : "";
  const linkProps = external ? { href: link } : { as: Link, to: link };

  return (
    <Nav.Item className={navItemClassName}>
      <Nav.Link {...linkProps} target={target}>
        <span className="flex">
          {image && <Image src={image} width="40rem" />}
          <span className="sidebar-text">{title}</span>
        </span>
      </Nav.Link>
    </Nav.Item>
  );
};

const CollapsableNavItem = (props) => {
  const { pathname } = useLocation();
  const { eventKey, title, children = null } = props;
  const defaultKey = pathname.indexOf(eventKey) !== -1 ? eventKey : "";

  return (
    <Accordion as={Nav.Item} defaultActiveKey={defaultKey}>
      <Accordion.Item className="border-0 bg-blue-500" eventKey={eventKey}>
        <Accordion.Button
          as={Nav.Link}
          className="d-flex justify-content-between align-items-center bg-red-900"
        >
          <span>
            <span className="sidebar-icon"></span>
            <span className="sidebar-text">{title}</span>
          </span>
        </Accordion.Button>
        <Accordion.Body className="multi-level">
          <Nav className="pl-2 flex-column">{children}</Nav>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

const toNavItem = (item, i) => {
  switch (item.action.type) {
    case "brand":
      return (
        <div key={i} className="border-1 border-white rounded">
          <Nav.Link as={Link} to={item.action.path} className="h-full w-full">
            <div
              className="flex justify-center"
              style={{
                gap: "0.5rem",
                padding: "0.5rem",
              }}
            >
              <img src={leaf} width="40rem" alt={leaf} />
              <span
                class="font-bold text-4xl ml-3"
                style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                {item.title}
              </span>
            </div>
          </Nav.Link>
        </div>
      );
    case "link":
      return (
        <NavItem
          key={i}
          title={item.title}
          link={item.action.path}
          image={item.image}
        />
      );
    case "accordion":
      return (
        <CollapsableNavItem
          key={i}
          title={item.title}
          eventKey={item.title}
          image={item.image}
        >
          {item.action.items.map(toNavItem)}
        </CollapsableNavItem>
      );
    case "grow":
      return <div key={i} className="flex-grow-1" />;
    case "spacer":
      return <div key={i} style={{ height: "2.5rem" }} />;
    default:
      throw Error("impossible");
  }
};

export const Sidebar = ({ items }) => {
  const { location } = useLocation();
  const isMd = useMd();
  const [show, setShow] = useContext(SidebarContext);

  useEffect(() => {
    if (isMd) {
      setShow(false);
    }
  }, [location]);

  return (
    <div
      className={`sidebar ${
        show ? "" : "hidden"
      } flex-shrink-0 text-white overflow-y-auto h-full`}
    >
      <Nav
        style={{ fontFamily: "'Raleway', sans-serif" }}
        className="sidebar-inner min-h-full p-3 flex flex-col flex-nowrap pt-3 pb-3"
      >
        {items.map(toNavItem)}
      </Nav>
    </div>
  );
};
