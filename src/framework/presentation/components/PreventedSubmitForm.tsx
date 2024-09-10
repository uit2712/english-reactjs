export function PreventedSubmitForm({ children }: { children: any }) {
    return <form onSubmit={(e) => e.preventDefault()}>{children}</form>;
}
