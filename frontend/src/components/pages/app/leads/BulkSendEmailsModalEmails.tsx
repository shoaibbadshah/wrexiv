"use client";

import { ListLeadContactsQuery } from "@/graphql/generated";
import { useFormContext } from "react-hook-form";
import { FormInputs } from "./BulkSendEmailsModal";

type PropsType = {
  contacts: NonNullable<ListLeadContactsQuery["leadContacts"]>;
};

const BulkSendEmailsModalEmails = ({ contacts }: PropsType) => {
  const { watch, setValue } = useFormContext<FormInputs>();

  const emails = watch("emails");
  const credits = 5;

  return (
    <div className="space-y-4">
      <div>
        {emails.length} of {credits} credits will be used
      </div>
      <div>
        {contacts && contacts.length > 0 ? (
          <div className="overflow-auto max-h-80">
            <table className="table table-pin-rows">
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={emails.length === contacts.length}
                      className="checkbox"
                      onChange={e => {
                        if (e.target.checked) {
                          setValue(
                            "emails",
                            contacts.map(contact => contact.email)
                          );
                        } else {
                          setValue("emails", []);
                        }
                      }}
                    />
                  </th>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody className="max-h-10">
                {contacts.map(contact => {
                  return (
                    <tr key={contact.email}>
                      <th className="w-6">
                        <input
                          type="checkbox"
                          checked={emails.includes(contact.email)}
                          value={contact.email}
                          className="checkbox"
                          onChange={e => {
                            if (e.target.checked) {
                              setValue("emails", [...emails, contact.email]);
                            } else {
                              setValue(
                                "emails",
                                emails.filter(email => email !== contact.email)
                              );
                            }
                          }}
                        />
                      </th>
                      <td>{contact.name}</td>
                      <td>{contact.email}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div>No emails found</div>
        )}
      </div>
    </div>
  );
};

export default BulkSendEmailsModalEmails;
