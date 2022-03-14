import React from "react";
import BaseHtrtPopUp from "../../../src/react-components/htrtPopUp/baseHtrtPopUp.jsx";

import "../../../src/css/index.js";
import "./fontFamily.css";

const textFiller = `Lorem ipsum dolor sit amet, consectetur adipiscing
elit.Morbi volutpat, lectus vitae facilisis mattis, leo sem fringilla tortor,
quis pharetra elit augue et orci. Quisque id blandit mi, sit amet vehicula
eros. Donec luctus purus enim, sit amet sagittis leo vulputate at.`;

export default {
  component: BaseHtrtPopUp,
  title: "Visuals/Molecules/BaseHtrtPopUp",
  argTypes: {
    okLabel: { control: "text" },
    onOk: { action: "clicked" },
    classes: { control: "text" },
  },
};

const Template = (args) => <BaseHtrtPopUp {...args} />;

export const Default = Template.bind({});
Default.args = {
  okLabel: "button label",
};

export const WithContent = Template.bind({});
WithContent.args = {
  ...Default.args,
  children: <p>{textFiller}</p>,
};

export const WithCustomClass = Template.bind({});
WithCustomClass.args = {
  ...WithContent.args,
  classes: "poly-theme-dark",
};
