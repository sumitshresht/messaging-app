import {
  Avatar,
  Card,
  HStack,
  Stack,
  Heading,
  Text,
  Button,
  Icon,
  Box,
} from "@chakra-ui/react";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
  AiFillDislike,
} from "react-icons/ai";
import { Spacer } from "@chakra-ui/react";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { useState, useEffect } from "react";

const PostCard = ({ post, user, onUnsave }) => {
  const reactions =
    typeof post.reactions === "object"
      ? post.reactions
      : { likes: post.reactions ?? 0, dislikes: 0 };

  const [reaction, setReaction] = useState(null); // "like" | "dislike" | null

  const likeCount = reactions.likes + (reaction === "like" ? 1 : 0);
  const dislikeCount = reactions.dislikes + (reaction === "dislike" ? 1 : 0);

  const handleReaction = (type) => {
    setReaction((prev) => (prev === type ? null : type));
  };
  const handleSavePost = () => {
  let saved = JSON.parse(localStorage.getItem("savedPosts")) || [];

  const index = saved.findIndex(
    (p) => p.title === post.title && p.body === post.body
  );

  if (index === -1) {
    saved.push(post);
    setIsSaved(true);
  } else {
    saved.splice(index, 1);
    setIsSaved(false);
    if (onUnsave) {
      onUnsave(post); // notify parent immediately
    }
  }

  localStorage.setItem("savedPosts", JSON.stringify(saved));
};


  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedPosts")) || [];
    const found = saved.some(
      (p) => p.title === post.title && p.body === post.body
    );
    setIsSaved(found);
  }, [post]);

  return (
    <Card.Root
      bg="gray.800"
      borderRadius="md"
      borderColor="gray.700"
      px={4}
      py={3}
      color="white"
      w="100%"
      maxW="900px"
      mx="auto"
      boxShadow="sm"
    >
      <Card.Body>
        <Stack spacing={3}>
          {/* Avatar + Username */}
          <HStack spacing={3} align="center">
            <Avatar.Root boxSize="8">
              <Avatar.Image src={user.avatar} />
              <Avatar.Fallback name={user.name} />
            </Avatar.Root>

            <Text fontSize="sm" fontWeight="medium" color="gray.300">
              {user.name}
            </Text>
          </HStack>

          {/* Title */}
          <Heading size="sm" color="teal.300">
            {post.title}
          </Heading>

          {/* Body */}
          <Text fontSize="sm" color="gray.200">
            {post.body}
          </Text>

          <Box height="1px" bg="gray.700" />

          {/* Reactions */}
          <HStack spacing={5} pt={1} align="center">
            {/* Like */}
            <HStack spacing={1} align="center">
              <Button
                variant="ghost"
                p={0}
                minW="auto"
                onClick={() => handleReaction("like")}
                color={reaction === "like" ? "teal.300" : "gray.400"}
                _hover={{ bg: "gray.700" }}
                aria-label="Like"
              >
                <Icon
                  as={reaction === "like" ? AiFillLike : AiOutlineLike}
                  boxSize={5}
                />
              </Button>
              <Text fontSize="xs" color="gray.400">
                {likeCount}
              </Text>
            </HStack>

            {/* Dislike */}
            <HStack spacing={1} align="center">
              <Button
                variant="ghost"
                p={0}
                minW="auto"
                onClick={() => handleReaction("dislike")}
                color={reaction === "dislike" ? "red.300" : "gray.400"}
                _hover={{ bg: "gray.700" }}
                aria-label="Dislike"
              >
                <Icon
                  as={reaction === "dislike" ? AiFillDislike : AiOutlineDislike}
                  boxSize={5}
                />
              </Button>
              <Text fontSize="xs" color="gray.400">
                {dislikeCount}
              </Text>
            </HStack>

            {/* Spacer to push Save icon to the right */}
            <Spacer />

            {/* Save */}
            <Button
              variant="ghost"
              p={0}
              minW="auto"
              onClick={handleSavePost}
              color={isSaved ? "teal.300" : "gray.400"}
              _hover={{ bg: "gray.700", color: "teal.300" }}
              aria-label="Save"
            >
              <Icon as={isSaved ? BsBookmarkFill : BsBookmark} boxSize={5} />
            </Button>
          </HStack>
        </Stack>
      </Card.Body>
    </Card.Root>
  );
};

export default PostCard;
