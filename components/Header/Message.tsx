import { Check } from "lucide-react";
import Code from "../Code";
import Loader from "../ui/Loader";


interface ContentState {
    id: string;
    text: string;
    icon?: JSX.Element,
    additionalClasses?: string
}

const CONTENT_STATES: Partial<Record<Message, ContentState>> = {
    SUCCESS: {
      id: "success",
      text: "Changes Saved",
      icon: <Check size={16} aria-hidden="true" />,
      additionalClasses: "text-green-400",
    },
    ERROR: {
      id: "error",
      text: "Failed to save",
      icon: <X size={16} aria-hidden="true" />,
      additionalClasses: "text-red-400",
    },
    UNAUTHORIZED: {
      id: "unauthorized",
      text: "You don't have access",
      additionalClasses: "text-red-400",
    },
    TOO_MANY_REQUESTS: {
      id: "too-many-requests",
      text: "Too many requests",
      additionalClasses: "text-red-400",
    },
    LIMIT_REACHED: {
      id: "limit-reached",
      text: "Limit reached",
      additionalClasses: "text-red-400",
    },
    EMPTY_EDITOR: {
      id: "empty-editor",
      text: "Add some code first",
      icon: <Code size={16} aria-hidden="true" />,
    },
    CLIPBOARD_API_NOT_SUPPORTED: {
      id: "clipboard-api-not-supported",
      text: "Clipboard API not supported",
      additionalClasses: "text-red-400",
    },
    UNKNOWN_ERROR: {
      id: "unknown-error",
      text: "Something went wrong",
      additionalClasses: "text-red-400",
    },
    SNIPPET_NOT_FOUND: {
      id: "snippet-not-found",
      text: "Snippet not found",
      additionalClasses: "text-red-400",
    },
    INTERNAL_SERVER_ERROR: {
      id: "internal-server-error",
      text: "Internal server error",
      additionalClasses: "text-red-400",
    },
    PENDING: {
      id: "pending",
      text: "Saving...",
      icon: <Loader />,
    },
  };

  function Wrapper({ content }: { content: ContentState }) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 5 }}
        transition={{ duration: 0.1 }}
        className={cn(
          "flex items-center justify-between gap-2 p-2 text-xs",
          "select-none",
          content.additionalClasses
        )}
      >
        {content.icon}
        {content.text}
      </motion.div>
    );
  }