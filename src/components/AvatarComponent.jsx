import { Avatar } from "@chakra-ui/react";

const AvatarComponent = ({ name = "Undefined", pictureSrc, size = "xs" }) => {
	return (
		<Avatar.Root size={size}>
			<Avatar.Fallback name={name} />
			{pictureSrc && <Avatar.Image src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04" />}
		</Avatar.Root>
	);
};
export default AvatarComponent;
