import React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";

export default function StarsRating({rating}) {
    return (
            <>
                  <Box
                    sx={{
                        '& > legend': { mt: 2 },
                    }}
                >
                    <Typography component="legend">Rating</Typography>
                    <Rating name="customized-10" value={rating}  max={10} />
                </Box>
            </>
    );
}