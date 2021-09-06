/** @format */
import * as React from "react";
import {
  render,
  cleanup,
  fireEvent,
  RenderResult,
  logRoles,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import SiderMenu from "@components/siderMenu";

const defaultProps = {
  collapsed: false,
  history: {
    location: {
      pathname: "/",
    },
  },
  menuList: [
    {
      id: 1,
      pid: 0,
      name: "仪表盘",
      type: 1,
      icon: "icondashboard",
      url: "/dashboard",
      code: "dashboard",
      desc: null,
      create_time: "2021-03-10T10:47:52.000Z",
      modified_time: null,
    },
  ],
};

describe("test siderMenu", () => {
  let wrapper: RenderResult;

  beforeEach(() => {
    wrapper = render(<SiderMenu {...defaultProps} />);
  });

  afterEach(cleanup);

  it("test siderMenu -- snapshot", () => {
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it("test siderMenu -- click event", () => {
    const menu = wrapper.getByTestId("test-sider-nav");
    const handleClick = jest.fn();
    fireEvent.click(menu);
    expect(handleClick).toHaveBeenCalled();
  });
});
