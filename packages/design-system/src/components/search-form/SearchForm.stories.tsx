import { Meta, StoryObj } from "@storybook/react-vite";
import { JSONSchema7 } from "json-schema";
import { getArgsShared } from "@kickstartds/core/lib/storybook";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { SearchForm } from "./SearchFormComponent";
import schema from "./search-form.schema.dereffed.json";
import "./SearchFormPagefind.client";

const meta: Meta<typeof SearchForm> = {
  title: "Corporate / Search Form",
  component: SearchForm,
  parameters: {
    viewport: {
      width: 770,
      height: 248,
    },
    jsonschema: { schema },
  },
  ...getArgsShared(schema as JSONSchema7),
};

export default meta;

type Story = StoryObj<typeof SearchForm>;

// Hits enough of the stories the pagefind index of a built Storybook contains to
// span more than one page of results, which is when the form renders the
// "view all results" button instead of its own pagination.
const searchTerm = "content";

// The header's search modal renders the form with an `action` (the search page),
// and that is what turns the client's pagination into the "view all results"
// button. `SearchFormProps` is generated from the component's own JSON schema and
// knows no form attributes, so the action goes through an object spread - the way
// the website passes it - to keep TypeScript's excess property check out of the
// way. It stays out of the args, because that would add it to the form's
// Storyblok preset, which has no action.
const searchFormProps = { action: "/suche" };

export const Pagefind: Story = {
  args: {
    component: "dsa.search-form.pagefind",
  },
  render: (args) => <SearchForm {...args} {...searchFormProps} />,
  // The search bar has to be typed into for the button to show up at all, so the
  // story drives the client: a term with hits reveals the button with its count,
  // clearing the term has to take it away again.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const searchInput = canvas.getByRole("searchbox");

    await userEvent.type(searchInput, searchTerm);
    await waitFor(
      () =>
        expect(
          canvas.getByRole("button", { name: /view all results/i })
        ).toBeVisible(),
      { timeout: 10000 }
    );
    const moreButton = canvas.getByRole("button", {
      name: /view all results/i,
    });

    await userEvent.clear(searchInput);
    await waitFor(() => expect(moreButton).not.toBeVisible());
  },
};
