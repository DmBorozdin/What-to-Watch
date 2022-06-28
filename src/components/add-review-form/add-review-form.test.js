import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddReviewForm from "./add-review-form";
import {ReviewFormStatus} from "../../const";

describe(`AddReviewForm test`, () => {
  it(`AddReviewForm should be render correctly`, () => {
    const {container} = render(
        <AddReviewForm onSubmit={jest.fn()} pageId={1} reviewFormStatus={ReviewFormStatus.ENABLE}/>
    );

    expect(container.querySelector(`.add-review__fieldset`)).toBeInTheDocument();
    expect(container.querySelector(`.add-review__fieldset`)).not.toHaveAttribute(`disabled`);
    expect(screen.getAllByText(/Rating/i)).toHaveLength(10);
    expect(screen.getByPlaceholderText(`Review text`)).toBeInTheDocument();
    expect(screen.getByText(`Post`)).toBeInTheDocument();
    expect(screen.getByText(`Post`)).toHaveAttribute(`disabled`);
  });

  it(`AddReviewForm should be disabled if reviewFormStatus = disabled`, () => {
    const {container} = render(
        <AddReviewForm onSubmit={jest.fn()} pageId={1} reviewFormStatus={ReviewFormStatus.DISABLE}/>
    );

    expect(container.querySelector(`.add-review__fieldset`)).toBeInTheDocument();
    expect(container.querySelector(`.add-review__fieldset`)).toHaveAttribute(`disabled`);
  });

  it(`Input should be selected when star is clicked `, () => {
    render(
        <AddReviewForm onSubmit={jest.fn()} pageId={1} reviewFormStatus={ReviewFormStatus.ENABLE}/>
    );

    expect(screen.getByLabelText(`Rating 5`)).not.toBeChecked();
    userEvent.click(screen.getByLabelText(`Rating 5`));
    expect(screen.getByLabelText(`Rating 5`)).toBeChecked();
    expect(screen.getByText(`Post`)).toBeDisabled();
  });

  it(`Hint should be shown when not all text is entered and rating is not selected `, () => {
    render(
        <AddReviewForm onSubmit={jest.fn()} pageId={1} reviewFormStatus={ReviewFormStatus.ENABLE}/>
    );

    expect(screen.queryByText(`Выберите оценку фильму от 1 до 10`)).not.toBeInTheDocument();
    expect(screen.getByPlaceholderText(`Review text`)).toHaveDisplayValue(``);
    fireEvent.change(screen.getByPlaceholderText(`Review text`), {target: {value: `Hello`}});
    expect(screen.getByPlaceholderText(`Review text`)).toHaveDisplayValue(`Hello`);
    expect(screen.getByText(`Выберите оценку фильму от 1 до 10`)).toBeInTheDocument();
    expect(screen.getByText(`Post`)).toBeDisabled();
  });

  it(`If rating is selected and not all text is entered Post button should be disabled`, () => {
    render(
        <AddReviewForm onSubmit={jest.fn()} pageId={1} reviewFormStatus={ReviewFormStatus.ENABLE}/>
    );

    expect(screen.getByPlaceholderText(`Review text`)).toHaveDisplayValue(``);
    expect(screen.getByLabelText(`Rating 5`)).not.toBeChecked();
    userEvent.click(screen.getByLabelText(`Rating 5`));
    fireEvent.change(screen.getByPlaceholderText(`Review text`), {target: {value: `Hello`}});
    expect(screen.getByLabelText(`Rating 5`)).toBeChecked();
    expect(screen.getByPlaceholderText(`Review text`)).toHaveDisplayValue(`Hello`);
    expect(screen.getByText(`Post`)).toBeDisabled();
  });

  it(`If rating is not selected and all text is entered Post button should be disabled`, () => {
    render(
        <AddReviewForm onSubmit={jest.fn()} pageId={1} reviewFormStatus={ReviewFormStatus.ENABLE}/>
    );

    expect(screen.getByPlaceholderText(`Review text`)).toHaveDisplayValue(``);
    fireEvent.change(screen.getByPlaceholderText(`Review text`), {target: {value: `I love this movie. Great Immersive camera-work. This film is an experience and i has already seen it 4 times.`}});
    expect(screen.getByText(`Выберите оценку фильму от 1 до 10`)).toBeInTheDocument();
    expect(screen.getByText(`Post`)).toHaveAttribute(`disabled`);
  });

  it(`If rating is selected and all text is entered Post button should be enable`, () => {
    render(
        <AddReviewForm onSubmit={jest.fn()} pageId={1} reviewFormStatus={ReviewFormStatus.ENABLE}/>
    );

    expect(screen.getByPlaceholderText(`Review text`)).toHaveDisplayValue(``);
    expect(screen.getByLabelText(`Rating 5`)).not.toBeChecked();
    userEvent.click(screen.getByLabelText(`Rating 5`));
    fireEvent.change(screen.getByPlaceholderText(`Review text`), {target: {value: `I love this movie. Great Immersive camera-work. This film is an experience and i has already seen it 4 times.`}});
    expect(screen.getByText(`Post`)).toBeEnabled();
  });

  it(`When form is submitted, "onSubmit" function must be called`, () => {
    const handleSubmit = jest.fn();
    render(
        <AddReviewForm onSubmit={handleSubmit} pageId={1} reviewFormStatus={ReviewFormStatus.ENABLE}/>
    );

    userEvent.click(screen.getByLabelText(`Rating 5`));
    fireEvent.change(screen.getByPlaceholderText(`Review text`), {target: {value: `I love this movie. Great Immersive camera-work. This film is an experience and i has already seen it 4 times.`}});
    userEvent.click(screen.getByText(`Post`));
    expect(handleSubmit).toHaveBeenCalledWith({
      rating: `5`,
      comment: `I love this movie. Great Immersive camera-work. This film is an experience and i has already seen it 4 times.`,
      id: 1,
    });
  });
});
