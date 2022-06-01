import React from "react";
import {render} from "@testing-library/react";
import MiniVideoPlayer from "./mini-player";

describe(`VideoPlayer test`, () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.play = () => {};
    window.HTMLMediaElement.prototype.pause = () => {};
  });

  it(`MiniVideoPlayer should be render correctly`, () => {
    const mockPath = `mock-path`;
    const mockPoster = `mock-poster.jpg`;
    const mockWidth = `300`;
    const mockHeight = `200`;
    const {container} = render(<MiniVideoPlayer src={mockPath} isPlaying={false} poster={mockPoster} width={mockWidth} height={mockHeight}/>);

    expect(container.querySelector(`video`)).toBeInTheDocument();
  });
});
