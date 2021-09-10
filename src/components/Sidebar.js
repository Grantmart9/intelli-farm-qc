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
import React, { useState } from "react";
import SimpleBar from "simplebar-react";
import { useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import leaf from "./leaf.png";
import {
  Nav,
  Badge,
  Image,
  Button,
  Accordion,
} from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";
import { Routes } from "../routes";

export const Sidebar = ({ items }) => {
  const location = useLocation();
  const { pathname } = location;
  const [show, setShow] = useState(true);
  const showClass = show ? "show" : "";
  const onCollapse = () => setShow(!show);
  const CollapsableNavItem = (props) => {
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
            <Nav className="flex-column">{children}</Nav>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  };

  const NavItem = (props) => {
    const {
      title,
      link,
      external,
      target,
      icon,
      image,
      badgeText,
      badgeBg = "secondary",
      badgeColor = "primary",
    } = props;
    const classNames = badgeText
      ? "d-flex justify-content-start align-items-center justify-content-between"
      : "";
    const navItemClassName = link === pathname ? "active" : "";
    const linkProps = external ? { href: link } : { as: Link, to: link };

    return (
      <Nav.Item className={navItemClassName} onClick={() => setShow(false)}>
        <Nav.Link {...linkProps} target={target} className={classNames}>
          <span>
            {icon ? <span className="sidebar-icon"></span> : null}
            {image ? (
              <Image
                src={image}
                width={100}
                height={20}
                className="sidebar-icon svg-icon"
              />
            ) : null}
            <span className="sidebar-text">{title}</span>
          </span>
          {badgeText ? (
            <Badge
              pill
              bg={badgeBg}
              text={badgeColor}
              className="badge-md notification-count ms-2"
            >
              {badgeText}
            </Badge>
          ) : null}
        </Nav.Link>
      </Nav.Item>
    );
  };

  const toNavItem = (item, i) => {
    switch (item.action.type) {
      case "brand":
        return (
            <Button
              key={i}
              className="border-1 border-white"
              style={{
                display: "flex",
                alignContent: "center",
                backgroundColor: "#1e96ff",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "2.5rem",
                fontWeight: "bold",
                fontFamily: "'Noto Sans JP', sans-serif",
                gap: "0.5rem",
                padding: "0.5rem",
                marginBottom: "2.5rem",
              }}
              href={item.action.path}
            >
              <img src={leaf} width="40rem" alt={leaf} />
              {item.title}
            </Button>
        )
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
      case "spacer":
        return <div key={i} className="flex-grow-1"/>
      default:
        throw Error("impossible");
    }
  };
  const navItems = items.map(toNavItem);

  return (
    <>
      <CSSTransition timeout={300} in={show} classNames="sidebar-transition">
        <div
          className={`collapse ${showClass} sidebar flex-shrink-0 text-white`}
        >
          <div className="h-full sidebar-inner px-4 pt-3">
            <Nav style={{ fontFamily: "Times New Roman" }} className="h-full flex-column pt-3 pb-3">
              {navItems}
            </Nav>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};
