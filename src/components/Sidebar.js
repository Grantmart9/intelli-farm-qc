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
import React, {
  useState,
  useContext,
  createContext,
  useEffect,
  useCallback,
} from "react";
import { useLocation } from "react-router-dom";
import leaf from "images/leaf.png";
import { Nav, Image, Button, Accordion } from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";
import { useMd } from "media-query";

export const SidebarContext = createContext();

const NavItem = ({ title, link, external, target, image, onClick, active }) => {
  const activeClassName = active ? "active" : "";
  const linkProps = external ? { href: link } : { as: Link, to: link };

  return (
    <Nav.Item className={activeClassName}>
      <Nav.Link {...linkProps} target={target} onClick={onClick}>
        <span className="flex">
          {image && <Image src={image} width="40rem" />}
          <span className="sidebar-text">{title}</span>
        </span>
      </Nav.Link>
    </Nav.Item>
  );
};

const CollapsableNavItem = (props) => {
  const { eventKey, title, active, children = null } = props;
  const activeClassName = active ? "active" : "";
  return (
    <Accordion as={Nav.Item} className={activeClassName}>
      <Accordion.Item className={`border-0 bg-blue-500`} eventKey={eventKey}>
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

const navItemToLinks = (item) => {
  switch (item.action.type) {
    case "link":
      return [item.action.path];
    case "accordion":
      return item.action.items.flatMap((item) => navItemToLinks(item));
    default:
      return [];
  }
};

const toNavItem = (item, i, props) => {
  const links = navItemToLinks(item);
  const active = links.some((link) => link == props.pathname);
  switch (item.action.type) {
    case "brand":
      return (
        <div key={i} className="border-1 border-white rounded">
          <Nav.Link
            as={Link}
            to={item.action.path}
            className="h-full w-full"
            onClick={props.onLinkClick}
          >
            <div
              className="flex justify-center"
              style={{
                gap: "0.5rem",
                padding: "0.5rem",
              }}
            >
              <img src={leaf} width="40rem" alt={leaf} />
              <span
                className="font-bold text-4xl ml-3"
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
          onClick={props.onLinkClick}
          active={active}
        />
      );
    case "accordion":
      return (
        <CollapsableNavItem
          key={i}
          title={item.title}
          eventKey={item.title}
          image={item.image}
          active={active}
        >
          {item.action.items.map((item, i) => toNavItem(item, i, props))}
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
  const { location, pathname } = useLocation();
  const isMd = useMd();
  const [show, setShow] = useContext(SidebarContext);

  const onLinkClick = useCallback(() => {
    if (isMd) {
      setShow(false);
    }
  });

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
        {items.map((item, i) => toNavItem(item, i, { onLinkClick, pathname }))}
      </Nav>
    </div>
  );
};
