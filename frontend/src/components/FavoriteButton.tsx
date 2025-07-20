import { IconButton, Tooltip } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useState } from "react";

export function FavoriteButton() {
  const [favorite, setFavorite] = useState(false);

  const toggleFavorite = () => {
    setFavorite(!favorite);
  };

  return (
    <Tooltip title={favorite ? "スター登録" : "スター解除"}>
      <IconButton
        onClick={toggleFavorite}
        aria-label="favorite"
        color={favorite ? "warning" : "default"}
      >
        {favorite ? <StarIcon /> : <StarBorderIcon />}
      </IconButton>
    </Tooltip>
  );
}
