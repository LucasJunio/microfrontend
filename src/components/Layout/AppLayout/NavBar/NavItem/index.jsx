import React, { useState } from "react";
import {
  Collapse,
  List,
  Divider,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { ExpandLess, ExpandMore, Dashboard } from "@material-ui/icons";
import { useStyles } from "./styles";
import { sections } from "../../../../../menus";
import { Link } from "react-router-dom";

export const NavItens = () => {
  const classes = useStyles();
  const [openSection, setOpenSection] = useState(sections);

  const handleClick = (section) => {
    const currentSection = sections.findIndex((obj) => {
      return obj.section === section;
    });
    const newArray = [...sections];
    newArray[currentSection].open = !sections[currentSection].open;
    setOpenSection(newArray);
  };

  const Sections = sections.map((section) => {
    return (
      <List
        key={section.subheader}
        component="nav"
        aria-labelledby="nested-list-subheader"
        // subheader={
        //   <ListSubheader component="div" id="nested-list-subheader">
        //     Nested List Items
        //   </ListSubheader>
        // }
        className={classes.root}
      >
        <ListItem
          to="/"
          button
          onClick={() => {
            handleClick(section.section);
          }}
        >
          <ListItemText
            primary={
              <Typography variant="overline" display="block" gutterBottom>
                {section.subheader}
              </Typography>
            }
          />
          {section.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={section.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {section.items.map((item) => {
              const Icon = item.icon;
              return (
                <ListItem
                  key={item.title}
                  button
                  component={Link}
                  to={item.href}
                  className={classes.nested}
                >
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        {item.title}{" "}
                      </Typography>
                    }
                  />
                </ListItem>
              );
            })}
          </List>
        </Collapse>
        <Divider />
      </List>
    );
  });

  return (
    <div>
      <Divider />
      <List>
        <ListItem button component={Link} to="/dashboard">
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </List>
      {Sections}
    </div>
  );
};

export default NavItens;
