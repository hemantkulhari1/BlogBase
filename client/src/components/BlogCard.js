import * as React from 'react';
import Card from '@mui/material/Card';
import moment from 'moment';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from "react-hot-toast";


export default function BlogCard({title,description,image,username,time,isUser,id}) {
       const navigate = useNavigate()
       const handleEdit = () => {
            navigate(`/blog-details/${id}`);
       };
    const formattedTime = moment(time).format(' h:mm a ,MMMM Do YYYY');

const handleDelete = async () => {
  try {
    const { data } = await axios.delete(`/api/v1/blog/delete-blog/${id}`);
    if (data?.success) {
      alert("Blog Deleted");
      window.location.reload();
    }
  } catch (error) {
    console.log(error);
  }
};
  return (
    <Card sx={{
  width: "40%",
  margin: "auto",
  mt: 2,
  padding: 2,
  boxShadow: "5px 5px 10px #ccc",
  ":hover": {
    boxShadow: "10px 10px 20px #ccc",
  },
}}>
      {
  isUser && (
    <Box display={"flex"}>
      <IconButton sx={{ marginLeft: "auto" }}>
        <EditIcon color='info' onClick={() => navigate(`/blog-details/${id}`)}/>
      </IconButton>
      <IconButton  onClick={handleDelete}>
        <DeleteIcon color='error'/>
      </IconButton>
    </Box>
  )}

      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {username}
          </Avatar>
        }
       
        title={title}
        subheader={formattedTime}
      />
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt="image"
      />
      <CardContent>
        <Typography variant="h6" sx={{ color: 'text.secondary' }}>
          Title : {description}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Description : {description}
        </Typography>
      </CardContent>
      
    </Card>
  );
}
