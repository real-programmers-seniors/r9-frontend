import { SyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReview } from "~/libs/api/reviews";
import { selectReview, setReview } from "~/redux/slices/review-slice";

export default function useReviewForm() {
  const dispatch = useDispatch();
  const review = useSelector(selectReview);

  const onChangeReview = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    const body = {
      key: name,
      value,
    };
    dispatch(setReview(body));
    console.log(review);
  };

  const onChangeRating = (
    e: SyntheticEvent<Element, Event>,
    newValue: number | null
  ) => {
    const body = {
      key: "rating",
      value: newValue,
    };
    dispatch(setReview(body));
    console.log(review);
  };

  const onCreateReview = async () => {
    try {
      await createReview(review);
    } catch (error) {
      alert("후기 작성에 실패했습니다");
    }
  };

  return { onChangeReview, onChangeRating, onCreateReview };
}
